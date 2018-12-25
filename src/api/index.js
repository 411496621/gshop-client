/*
* 包含n个接口请求的方法的模块
* 每一个方法返回的都是promise对象
* */
import ajax from './ajax'
/*const baseUrl = 'http://localhost:5000'*/
const baseUrl = '/api'

export const reqAddress = (longitude,latitude)=> ajax(`${baseUrl}/position/${latitude},${longitude}`)
export const reqCategorys = ()=> ajax(`${baseUrl}/index_category`)
export const reqShops = (longitude,latitude)=> ajax(`${baseUrl}/shops`,{longitude,latitude})
// 发送短信验证码
export const reqCode = phone=> ajax(`${baseUrl}/sendcode`,{phone})
// 手机号验证码登录 获取用户信息
export const reqSms = ({phone,code})=> ajax(`${baseUrl}/login_sms`,{phone,code},'POST')
// 密码验证登录 获取用户信息
export const reqPwd = ({name,pwd,captcha})=> ajax(`${baseUrl}/login_pwd`,{name,pwd,captcha},'POST')

// 通过cookie和session 发送请求获取用户信息实现自动登录
export const reqUserInfo = ()=> ajax(`${baseUrl}/userinfo`)
// 用户登出
export const reqLogout = ()=>ajax(`${baseUrl}/logout`)

 // 获取shop相关的mock数据
export const reqShopGoods = ()=> ajax('/goods')
export const reqShopInfo = ()=> ajax('/info')
export const reqShopRatings = ()=> ajax('/ratings')
