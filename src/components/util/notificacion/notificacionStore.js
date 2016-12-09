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
  addNotification: ({commit}, notificacion) => {
    commit('SET_NOTIFICACION', notificacion)
  },
  removeNotification: ({commit}, notificacion) => {
    commit('DELETE_NOTIFICACION', notificacion)
  }
}

export default {
  state, mutations, actions
}
