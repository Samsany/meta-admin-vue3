import { defHttp } from '/@/utils/http/axios'
import { GetUserInfoModel } from './model/userModel'

import { ErrorMessageMode } from '/#/axios'
import { useMessage } from '/@/hooks/web/useMessage'

const { createErrorModal } = useMessage()
enum Api {
  GetUserInfo = '/meta-auth/auth/user/info',
  Logout = '/meta-auth/auth/logout',
  TestRetry = '/testRetry',
  IsAccountExist = '',
  GetPermCode = '/sys/permission/getPermCode',
  //校验用户接口
  checkOnlyUser = '/sys/user/checkOnlyUser',
  //校验手机号
  phoneVerify = '/sys/user/phoneVerification',
  //修改密码
  passwordChange = '/sys/user/passwordChange',
  //获取短信验证码的接口
  getSmsCaptcha = '/meta-auth/oauth/captcha/sms',
  //第三方登录验证码的接口
  getThirdCaptcha = '/sys/thirdSms'
}

/**
 * 用户详情
 *
 * @description: getUserInfo
 */
export function getUserInfo(mode: ErrorMessageMode = 'message') {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: mode })
}

/**
 * @description: 退出登录
 */
export function doLogout() {
  return defHttp.get({ url: Api.Logout })
}

/**
 * @description: 获取短信验证码
 */
export function getSmsCaptcha(params) {
  return defHttp.post({ url: Api.getSmsCaptcha, params })
}

/**
 * @description: 获取第三方短信验证码
 */
export function setThirdCaptcha(params) {
  return new Promise((resolve, reject) => {
    defHttp.post({ url: Api.getThirdCaptcha, params }, { isTransformResponse: false }).then(res => {
      console.log(res)
      if (res.success) {
        resolve(true)
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' })
        reject()
      }
    })
  })
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000
      }
    }
  )
}
