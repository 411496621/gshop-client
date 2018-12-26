import Vue from "vue"
import {reqShopGoods,reqShopInfo,reqShopRatings} from "../../api"
import {
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_RATINGS,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT
} from "../mutation-types"
export const  state = {
  goods:[],
  ratings:[],
  info:{},
  foods:[]
}
export const actions = {
  async getShopGoods({commit},callback){
    const result = await reqShopGoods()
    if(result.code===0){
      commit(RECEIVE_SHOP_GOODS,{goods:result.data})
      typeof callback==='function'&& callback()
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
  },
  computeCount({commit},{isAdd,food}){
     if(isAdd){ //加
       commit(ADD_FOOD_COUNT,{food})
     }else{
       commit(REDUCE_FOOD_COUNT,{food})
     }
  }
}
export const getters = {
  totalCount(state){
    return state.foods.reduce((pre,food)=>pre + food.count,0)
  },
  totalPrice(state){
    return state.foods.reduce((pre,food)=>pre + food.price*food.count,0)
  }

}
export const mutations = {
  [RECEIVE_SHOP_GOODS](state,{goods}){
    state.goods = goods
  },
  [RECEIVE_SHOP_RATINGS](state,{ratings}){
    state.ratings = ratings
  },
  [RECEIVE_SHOP_INFO](state,{info}){
    state.info = info
  },
  [ADD_FOOD_COUNT](state,{food}){
      if(!food.count){ // 因为count是新添加的属性 所以没有数据绑定 无法更新界面
        Vue.set(food, 'count',1)
        state.foods.push(food)
      }else{
        food.count++
      }
  },
  [REDUCE_FOOD_COUNT](state,{food}){
      if(food.count>0){
        food.count--
        if(food.count===0){
           state.foods.splice(state.foods.indexOf(food),1)
        }
      }
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
