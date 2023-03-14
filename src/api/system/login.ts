import { LoginParams, LoginResultModel } from '/@/api/system/model/userModel'
import { ErrorMessageMode } from '/#/axios'
import { defHttp } from '/@/utils/http/axios'

enum Api {
  Login = '/meta-auth/oauth/token',
  phoneLogin = '/meta-auth/phoneLogin',
  //第三方登录
  thirdLogin = '/meta-auth/oauth/social',
  // 获取图形验证码的接口
  getImageCaptcha = '/meta-auth/oauth/captcha/image',
  //注册接口
  registerApi = '/sys/user/register',
  //校验用户接口
  checkOnlyUser = '/sys/user/checkOnlyUser',
  //SSO登录校验
  validateCasLogin = '/sys/cas/client/validateLogin',
  //校验手机号
  phoneVerify = '/sys/user/phoneVerification',
  //获取二维码信息
  getLoginQrcode = '/sys/getLoginQrcode',
  //监控二维码扫描状态
  getQrcodeToken = '/sys/getQrcodeToken'
}

/**
 * 用户登录
 *
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  const { key, code, username, password, grant_type } = params
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      headers: {
        key,
        code
      },
      params: {
        username,
        password,
        grant_type,
        scope: 'all'
      },
      auth: {
        username: 'meta-admin-client',
        password: 'secret'
      }
    },
    {
      errorMessageMode: mode
    }
  )
}

/**
 * @description: user phoneLogin api
 */
export function phoneLoginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.phoneLogin,
      params
    },
    {
      errorMessageMode: mode
    }
  )
}

/**
 * @description: 第三方登录
 */
export function thirdLogin(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<LoginResultModel>(
    {
      url: `${Api.thirdLogin}/${params.token}/${params.thirdType}`
    },
    {
      errorMessageMode: mode
    }
  )
}

/**
 * 获取登录二维码信息
 */
export function getLoginQrcode() {
  const url = Api.getLoginQrcode
  return defHttp.get({ url: url })
}

/**
 * 监控扫码状态
 */
export function getQrcodeToken(params) {
  const url = Api.getQrcodeToken
  return defHttp.get({ url: url, params })
}

/**
 * @description: 获取图形验证码
 */
export function getImageCaptcha() {
  return defHttp.get({ url: Api.getImageCaptcha })
}
