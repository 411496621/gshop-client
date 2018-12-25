
import {reqShopGoods,reqShopInfo,reqShopRatings} from "../../api"
import {RECEIVE_SHOP_GOODS,RECEIVE_SHOP_INFO,RECEIVE_SHOP_RATINGS} from "../mutation-types"
export const  state = {
  goods:[],
  ratings:[],
  info:{}
}
export const actions = {
  async getShopGoods({commit}){
    const result = await reqShopGoods()
    if(result.code===0){
      commit(RECEIVE_SHOP_GOODS,{goods:result.data})
    }
  },
  async getShopRatings({commit}){
    const result = await reqShopRatings()
    if(result.code===0){
      commit(RECEIVE_SHOP_RATINGS,{ratings:result.data})
    }
  },
  async getShopInfo({commit}){
    const result = await reqShopInfo()
    if(result.code===0){
      commit(RECEIVE_SHOP_INFO,{info:result.data})
    }
  }
}
export const getters = {

}
export const mutations = {
  [RECEIVE_SHOP_GOODS](state,{goods}){
    state.goods = goods
  },
  [RECEIVE_SHOP_RATINGS](state,{ratings}){
    state.ratings = ratings
  },
  [RECEIVE_SHOP_INFO](state,info){
    state.info = info
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
