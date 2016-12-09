// Check local storage to handle refreshes
if (window.localStorage) {
  if (store.state.userStore.token !== window.localStorage.getItem('authUser')) {
    store.dispatch('setToken', window.localStorage.getItem('authUser'))
  }
}

// Import System requirements
import Vue from 'vue'
import Resource from 'vue-resource'
import router from './router'

import store from './store'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize, capitalize } from './filters'

// Import Views - Top level

import AppView from './components/App.vue'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)
Vue.filter('capitalize', capitalize)

// Vue.transition('fade', {
//   enterClass: 'fadeInDown', // class of animate.css
//   leaveClass: 'fadeOutDown' // class of animate.css
// })

// Resource logic
Vue.use(Resource)

Vue.http.interceptors.push((request, next) => {
  // Enable this when you have a backend that you authenticate against
  var headers = request.headers
  if (window.location.pathname !== '/login' && !headers.hasOwnProperty('Authorization')) {
    headers.set('Authorization', 'Bearer ' + store.state.userStore.token)
  }
  headers.set('Accept', 'application/json')
  headers.set('Content-Type', 'application/json')
  // continue to next interceptor without modifying the response
  next()
})

router.beforeEach((to, from, next) => {
  store.dispatch('setMenuActual', to.name)
  if (to.matched.some(record => record.meta.requiresAuth) && (store.state.userStore.token === null)) {
    window.console.log('Not authenticated')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})

