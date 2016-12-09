import Vue from 'vue'
import Router from './router'
import store from './store'

export function vueHttp (tipo, url, callback) {
  let metodo = tipo.toLowerCase()
  if (['get', 'post', 'put', 'options', 'update'].indexOf(metodo) >= 0) {
    Vue.http[metodo](url).then(response => {
      callback(response)
    }, response => {
      if (response.status === 401) {
        Router.push('/login')
      } else {
        store.dispatch('addNotification', {
          text: 'ags',
          type: 'alert',
          delay: 10000
        })
      }
    })
  } else {
    console.log('Método inválido')
  }
}
