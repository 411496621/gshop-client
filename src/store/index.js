import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import msite from "./modules/msite"
import user from "./modules/user"
import actions from "./actions"
import getters from "./getters"

export default new Vuex.Store({
  modules:{
    msite,
    user
  },
  actions,
  getters
})

/*
*
*
* */
