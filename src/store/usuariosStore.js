import {usuarioUrl} from './../config'
import {vueHttp} from './../servicioRest'
import store from './../store'

const state = {
  usuarios: null,
  usuarioSeleccionado: {},
  mostrarModal: false,
  nuevo: false
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
  },
  SET_NUEVO_USUARIO (state, bool) {
    state.nuevo = bool
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
    vueHttp('get', usuarioUrl + id, response => {
      commit('SET_NUEVO_USUARIO', false)
      commit('SET_USUARIO', response.data)
      commit('TOGGLE_MODAL_USUARIO')
    })
  },
  actualizarUsuario: ({commit}, usuario) => {
    vueHttp('put', usuarioUrl, response => {
      store.dispatch('agregarNotificacion', {
        titulo: 'Éxito',
        texto: 'Usuario editado.',
        tipo: 'success',
        delay: 10000
      })
      store.dispatch('cargarUsuarios')
    }, usuario)
  },
  insertarUsuario: ({commit}, usuario) => {
    let resp = vueHttp('post', usuarioUrl, response => {
      store.dispatch('agregarNotificacion', {
        titulo: 'Éxito',
        texto: 'Usuario registrado.',
        tipo: 'success',
        delay: 10000
      })
      store.dispatch('cargarUsuarios')
    }, usuario)

    if (resp !== undefined) {
      // maneja excepciones
      return resp
    } else {
      store.commit('TOGGLE_MODAL_USUARIO')
    }
  },
  eliminarUsuario: ({commit}, id) => {
    vueHttp('delete', usuarioUrl + id, response => {
      store.dispatch('agregarNotificacion', {
        titulo: 'Éxito',
        texto: 'Usuario eliminado.',
        tipo: 'success',
        delay: 10000
      })
      store.dispatch('cargarUsuarios')
    })
  }
}

export default {
  state, mutations, actions
}
