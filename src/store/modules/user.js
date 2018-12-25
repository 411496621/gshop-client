import {RECEIVE_LOGOUT, RECEIVE_USER} from '../mutation-types'
import {reqLogout, reqUserInfo} from '../../api'

const state = {
  user:{}
}
const actions = {
  // 保存用户信息
  saveUser({commit},user){
    commit(RECEIVE_USER,{user})
  },
  // 自动登录获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code===0){
      const user = result.data
      commit(RECEIVE_USER,{user})
    }
  },
  // 退出登录 清除用户信息
  async clearUserInfo({commit}){
    const result = await reqLogout()
    if(result.code===0){
      commit(RECEIVE_LOGOUT)
    }
  }
}
const mutations = {
  [RECEIVE_USER](state,{user}){
    state.user = user
  },
  [RECEIVE_LOGOUT](state){
    state.user = {}
  }
}
const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters
}
