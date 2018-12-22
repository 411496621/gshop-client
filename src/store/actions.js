/*
* 包含n个可以间接修改状态数据的方法的对象的模块
* */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS
} from "./mutation-types"
import {reqAddress,reqCategory,reqShops} from "../api"

export default {
  async getAddress({commit,state}){
    const {longitude,latitude} = state
    const result = await reqAddress(longitude,latitude)
    if(result.code===0){ /*请求成功并得到想要的数据*/
      const address = result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  async getCategory({commit}){
    const result = await reqCategory()
    if(result.code===0){
      const category = result.data
      commit(RECEIVE_CATEGORY,{category})
    }
  },
  async getShops({commit,state}){
    const {longitude,latitude} = state
    const result = await reqShops(longitude,latitude)
    if(result.code===0){
        const shops = result.data
        commit(RECEIVE_SHOPS,{shops})
    }
  }
}
