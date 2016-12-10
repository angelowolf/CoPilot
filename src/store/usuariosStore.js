import {usuarioUrl} from './../config'
import {vueHttp} from './../servicioRest'

const state = {
  usuarios: null,
  usuarioSeleccionado: null,
  mostrarModal: false
}

const mutations = {
  SET_USUARIOS (state, usuarios) {
    state.usuarios = usuarios
  },
  SET_USUARIO (state, usuario) {
    state.usuarioSeleccionado = usuario
  },
  TOGGLE_MODAL_USUARIO (state) {
    state.mostrarModal = !state.mostrarModal
  }
}

const actions = {
  cargarUsuarios: ({commit}) => {
    vueHttp('get', usuarioUrl, response => {
      commit('SET_USUARIOS', response.data)
      return response.data
    })
  },
  verUsuario: ({commit}, id) => {
    commit('TOGGLE_MODAL_USUARIO')
  }
}

export default {
  state, mutations, actions
}
