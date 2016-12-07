<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- errors -->
            <div v-if=mensajeError class="text-red"><p>{{mensajeError}}</p></div>

            <!-- login form -->
            <form class="ui form loginForm"  @submit.prevent="logear">

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control" name="username" placeholder="Username" type="text" v-model="usuario">
              </div>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input class="form-control" name="password" placeholder="Password" type="password" v-model="clave">
              </div>
              <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Submit</button>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {loginUrl} from './../config'
import {mapState} from 'vuex'

export default{
  computed: {
    ...mapState({
      userStore: state => state.userStore
    })
  },
  data (router) {
    return {
      login: {
        usuario: 'admin',
        clave: 'admin'
      },
      mensajeError: ''
    }
  },
  methods: {
    logear () {
      const postData = {
        usuario: this.login.clave,
        clave: this.login.usuario
      }
      this.limpiarMensaje()
      this.$store.dispatch('TOGGLE_LOADING')
      //  Login
      this.$http.post(loginUrl, postData).then(response => {
        this.$store.dispatch('TOGGLE_LOADING')
        if (response.status === 200) {
          console.log(response.data)
          window.localStorage.setItem('authUser', JSON.stringify(response.data.access_token))
          // this.$http.get(userUrl, {headers: getHeader()})
          //   .then(response => {
          //     authUser.usuario = response.body.usuario
          //     authUser.name = response.body.name
          //     window.localStorage.setItem('authUser', JSON.stringify(authUser))
          this.$store.dispatch('setToken', response.data.access_token)
          this.$router.push('/')
          //   })
        } else {
          this.mensajeError = 'credenciales no validas'
        }
      }, function (mensajeError) {
        // error
        this.$store.dispatch('TOGGLE_LOADING')
        console.log('Error', mensajeError)
        this.mensajeError = 'El servidor no responde'
      })
    },
    limpiarMensaje () {
      this.response = ''
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
  background-color: #282B30 !important;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
</style>
