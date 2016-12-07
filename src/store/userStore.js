const state = {
  callingAPI: false,
  searching: '',
  serverURI: 'http://10.110.1.136:8080',
  user: null,
  token: null,
  userInfo: {
    messages: [{1: 'test', 2: 'test'}],
    notifications: [],
    tasks: []
  },
  menuActual: null,
  subMenuHijo: null
}

const mutations = {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  }
}

const actions = {
  setUser: ({commit}, userObj) => {
    commit('SET_USER', userObj)
  },
  setToken: ({commit}, token) => {
    commit('SET_TOKEN', token)
  },
  TOGGLE_LOADING: ({commit}) => {
    commit('TOGGLE_LOADING')
  },
  TOGGLE_SEARCHING: ({commit}) => {
    commit('TOGGLE_SEARCHING')
  }
}

export default {
  state, mutations, actions
}

