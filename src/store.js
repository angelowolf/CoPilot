import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './store/userStore'
import menuStore from './store/menuStore'
import usuariosStore from './store/usuariosStore'
import notificacionStore from './components/util/notificacion/notificacionStore'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    userStore, menuStore, usuariosStore, notificacionStore
  },
  strict: debug
})
