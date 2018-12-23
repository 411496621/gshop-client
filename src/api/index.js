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


