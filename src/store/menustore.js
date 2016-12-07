const state = {
  menuActual: null,
  subMenuHijo: null
}

const mutations = {
  SET_MENU_ACTUAL (state, menuSeleccionado) {
    state.menuActual = menuSeleccionado
  },
  SET_SUB_MENU_HIJO (state, subMenuSelect) {
    state.subMenuHijo = subMenuSelect
  }
}

const actions = {
  setMenuActual: ({commit}, menuSeleccionado) => {
    window.localStorage.setItem('menu', menuSeleccionado)
    commit('SET_MENU_ACTUAL', menuSeleccionado)
  },
  setSubMenuHijo: ({commit}, subMenuSelect) => {
    window.localStorage.setItem('subMenuHijo', subMenuSelect)
    commit('SET_SUB_MENU_HIJO', subMenuSelect)
  }
}

export default {
  state, mutations, actions
}
