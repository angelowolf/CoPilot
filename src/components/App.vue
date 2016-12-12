<template>
  <div>
    <router-view></router-view>
    <div id="app"></div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data: function () {
      return {
        section: 'Head',
        version: '0.10.0',
        callingAPI: false,
        serverURI: 'http://10.110.1.10:8080',
        caller: this.$http
      }
    },
    methods: {
      callAPI: function (method, url, data) {
        this.callingAPI = true
        url = url || this.serverURI // if no url is passed then inheret local server URI
        return this.caller({
          url: url,
          method: method,
          data: data
        })
      },
      logout: function () {
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setToken', null)

        if (window.localStorage) {
          window.localStorage.setItem('user', null)
          window.localStorage.setItem('token', null)
        }
        this.$router.push('/login')
      },
      mensajeRecibido (response) {
        let mensaje = JSON.parse(response.data)
        let tipo = mensaje.tipo + ''
        console.log('tipo', tipo)
        switch (tipo) {
          case 'LOGIN':
            {
              console.log('LOGIN', mensaje.mensaje)
            }
            break
          case 'OK':
            {
              console.log('OK', mensaje.mensaje)
            }
            break
          case 'ERROR':
            {
              console.log('ERROR', mensaje.mensaje)
            }
            break
        }
      }
    },
    created () {
      var socket = new WebSocket('ws://localhost:8081/wsnotificacion')
      socket.onopen = function () {
        var msg = '{"idUsuario":"' + 1 + '","tipo":"LOGIN"}'
        socket.send(msg)
      }
      socket.onmessage = this.mensajeRecibido
    }
  }
</script>
