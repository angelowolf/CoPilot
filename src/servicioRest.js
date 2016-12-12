import Vue from 'vue'
import Router from './router'
import store from './store'

export function vueHttp (tipo, url, callback, postData) {
  let metodo = tipo.toLowerCase()
  if (['get', 'post', 'put', 'options', 'update', 'delete'].indexOf(metodo) >= 0) {
    if (postData === undefined) {
      Vue.http[metodo](url).then(response => {
        callback(response)
      }, response => {
        if (response.status === 401) {
          Router.push('/login')
        } else if (response.status === 666) {
          return response.data
        } else {
          store.dispatch('agregarNotificacion', {
            titulo: 'Error de servidor',
            texto: 'Ocurrió un error al contactar con la API.',
            tipo: 'danger',
            delay: 10000
          })
        }
      })
    } else {
      Vue.http[metodo](url, postData).then(response => {
        callback(response)
      }, response => {
        if (response.status === 401) {
          Router.push('/login')
        } else if (response.status === 666) {
          return response.data
        } else {
          store.dispatch('agregarNotificacion', {
            titulo: 'Error de servidor',
            texto: 'Ocurrió un error al contactar con la API.',
            tipo: 'danger',
            delay: 10000
          })
        }
      })
    }
  } else {
    console.log('Método inválido')
  }
}
