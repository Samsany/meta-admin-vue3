import type { LoginInfo, UserInfo } from '/#/store'
import type { ErrorMessageMode } from '/#/axios'
import { defineStore } from 'pinia'
import { store } from '/@/store'
import { RoleEnum } from '/@/enums/roleEnum'
import { PageEnum } from '/@/enums/pageEnum'
import { LOGIN_INFO_KEY, PERMS_KEY, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum'
import { getAuthCache, setAuthCache } from '/@/utils/auth'
import { GetUserInfoModel, LoginParams, ThirdLoginParams } from '/@/api/system/model/userModel'
import { doLogout, getUserInfo } from '/@/api/system/user'
import { loginApi, phoneLoginApi, thirdLogin } from '/@/api/system/login'
import { useI18n } from '/@/hooks/web/useI18n'
import { useMessage } from '/@/hooks/web/useMessage'
import { router } from '/@/router'
import { usePermissionStore } from '/@/store/modules/permission'
import { RouteRecordRaw } from 'vue-router'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'
import { isArray } from '/@/utils/is'
import { h } from 'vue'
import { BasicKeys } from '/@/utils/cache/persistent'
import { useDictStore } from '/@/store/modules/dict'

interface UserState {
  userInfo: Nullable<UserInfo>
  //登录返回信息
  loginInfo?: Nullable<LoginInfo>
  token?: string
  roleList: RoleEnum[]
  permissionList: string[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // permissions
    permissionList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    //登录返回信息
    loginInfo: null
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    getLoginInfo(): LoginInfo {
      return this.loginInfo || getAuthCache<LoginInfo>(LOGIN_INFO_KEY) || {}
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY)
    },
    getPermissionList(): string[] {
      return this.permissionList.length > 0 ? this.permissionList : getAuthCache<string[]>(<BasicKeys>PERMS_KEY)
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    }
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : '' // for null or undefined value
      setAuthCache(TOKEN_KEY, info)
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      setAuthCache(ROLES_KEY, roleList)
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, info)
    },
    setLoginInfo(info: LoginInfo | null) {
      this.loginInfo = info
      setAuthCache(LOGIN_INFO_KEY, info)
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.userInfo = null
      this.token = ''
      this.roleList = []
      this.sessionTimeout = false
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean
        mode?: ErrorMessageMode
      }
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params
        const data = await loginApi(loginParams, mode)

        const { bearerType, accessToken } = data
        const token = bearerType + accessToken

        // save token
        this.setToken(token)
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    /**
     * 手机号登录
     * @param params
     */
    async phoneLogin(
      params: LoginParams & {
        goHome?: boolean
        mode?: ErrorMessageMode
      }
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params
        const data = await phoneLoginApi(loginParams, mode)
        const { token } = data
        // save token
        this.setToken(token)
        return this.afterLoginAction(goHome, data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    /**
     * 登录事件
     */
    async ThirdLogin(
      params: ThirdLoginParams & {
        goHome?: boolean
        mode?: ErrorMessageMode
      }
    ): Promise<any | null> {
      try {
        const { goHome = true, mode, ...ThirdLoginParams } = params
        const data = await thirdLogin(ThirdLoginParams, mode)
        const { token } = data
        // save token
        this.setToken(token)
        return this.afterLoginAction(goHome, data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    /**
     * 扫码登录事件
     */
    async qrCodeLogin(token): Promise<GetUserInfoModel | null> {
      try {
        // save token
        this.setToken(token)
        return this.afterLoginAction(true, {})
      } catch (error) {
        return Promise.reject(error)
      }
    },

    /**
     * 登录完成处理
     * @param goHome
     */
    async afterLoginAction(goHome?: boolean, data?: any): Promise<any | null> {
      if (!this.getToken) return null
      // get user info
      const userInfo = await this.getUserInfoAction()

      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        const permissionStore = usePermissionStore()
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction()
          routes.forEach(route => {
            router.addRoute(route as unknown as RouteRecordRaw)
          })
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
          permissionStore.setDynamicAddedRoute(true)
        }
        await this.setLoginInfo({ ...data, isLogin: true })
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
      }
      return userInfo
    },

    async getUserInfoAction(): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null
      const userInfo = await getUserInfo()
      const { roles = [] } = userInfo
      if (isArray(roles)) {
        const roleList = roles.map(item => item.value) as RoleEnum[]
        this.setRoleList(roleList)
      } else {
        userInfo.roles = []
        this.setRoleList([])
      }

      // 设置全局字典
      const dictStore = useDictStore()
      await dictStore.initDictItems()
      this.setUserInfo(userInfo)
      return userInfo
    },

    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout()
        } catch {
          console.log('注销Token失败')
        }
      }
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      goLogin && (await router.push(PageEnum.BASE_LOGIN))
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage()
      const { t } = useI18n()
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true)
        }
      })
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
