import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/types'

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic'

import { PageEnum } from '/@/enums/pageEnum'
import { t } from '/@/hooks/web/useI18n'

// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.globEager('./modules/**/*.ts')
const routeModuleList: AppRouteModule[] = []

// 加入到路由集合中
Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  }
}

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/system/login/Login.vue'),
  meta: {
    title: t('routes.basic.login')
  }
}

export const Oauth2LoginRoute: AppRouteRecordRaw = {
  path: '/oauth2-app/login',
  name: 'oauth2-app-login',
  component: () => import('/@/views/system/login/OAuth2Login.vue'),
  meta: {
    title: t('routes.basic.oauth2Login')
  }
}

export const SocialLoginRoute: AppRouteRecordRaw = {
  path: '/social/login',
  name: 'social-login',
  component: () => import('/@/views/system/login/SocialLoginPage.vue'),
  meta: {
    title: t('routes.basic.socialLogin')
  }
}

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [
  LoginRoute,
  Oauth2LoginRoute,
  SocialLoginRoute,
  RootRoute,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE
]
