import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import auth from './modules/auth'
import user from './modules/user'
import quotes from './modules/quotes'

Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    auth,
    user,
    quotes
  }
})
