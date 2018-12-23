/*
* 包含n个可以直接修改状态数据的方法的对象的模块
* */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from "./mutation-types"

export default {
  [RECEIVE_ADDRESS](state,{address}){
     state.address = address
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
     state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  }

}
