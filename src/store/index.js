import Vue from 'vue'
import Vuex from 'vuex'
import { routes } from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    path: []
  },
  mutations: {
    setPath(state, play) {
      console.log(play, 'pay')
      let l = play.length;
      let child = play[l - 1]
      if (l > 1) {
        play.length--
        if (child) {
          let routesLength = routes.length;
          while (routesLength--) {
            if (routes[routesLength].path === child) {
              child = routes[routesLength].name
            }
          }
        }
         // 变更状态
        state.path = [...play, child]
      } else {
        state.path = [...play]
      }
      // console.log(state.path, '== state.path ==')
    }
  },
  actions: {
  },
  modules: {
  }
})
