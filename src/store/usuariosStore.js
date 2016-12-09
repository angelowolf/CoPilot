import {usuarioUrl} from './../config'
import {vueHttp} from './../servicioRest'

const state = {
  usuarios: null,
  usuarioSeleccionado: null
}

const mutations = {
  SET_USUARIOS (sate, usuarios) {
    state.usuarios = usuarios
  }
}

const actions = {
  cargarUsuarios: ({commit}) => {
    vueHttp('get', usuarioUrl + 'getTodoss', response => {
      commit('SET_USUARIOS', response.data)
      return response.data
    })
  }
}

export default {
  state, mutations, actions
}
