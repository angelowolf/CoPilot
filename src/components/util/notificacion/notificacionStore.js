const state = {
  notificaciones: []
}

const mutations = {
  SET_NOTIFICACION (state, notificacion) {
    state.notificaciones.push(notificacion)
  },
  DELETE_NOTIFICACION (state, notificacion) {
    state.notificaciones.splice(notificacion)
  }
}

const actions = {
  agregarNotificacion: ({commit}, notificacion) => {
    commit('SET_NOTIFICACION', notificacion)
  },
  eliminarNotificacion: ({commit}, notificacion) => {
    commit('DELETE_NOTIFICACION', notificacion)
  }
}

export default {
  state, mutations, actions
}
