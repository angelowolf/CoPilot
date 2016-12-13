const state = {
  mensajes: []
}

const mutations = {
  SET_MENSAJE (state, mensaje) {
    state.mensajes.push(mensaje)
  },
  DELETE_MENSAJE (state, mensaje) {
    state.mensajes.splice(mensaje)
  }
}

const actions = {
  agregarMensaje: ({commit}, mensaje) => {
    commit('SET_MENSAJE', mensaje)
  },
  eliminarMensaje: ({commit}, mensaje) => {
    commit('DELETE_MENSAJE', mensaje)
  }
}

export default {
  state, mutations, actions
}
