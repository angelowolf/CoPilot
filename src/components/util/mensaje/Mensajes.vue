<script>
  import Mensaje from './Mensaje'
  export default {
    components: {
      Mensaje
    },
    data () {
      return {
        mensajes: this.$store.state.mensajesStore.mensajes
      }
    },
    methods: {
      eliminarMensaje (mensaje) {
        this.mensajeStore.dispatch('eliminarMensaje', mensaje)
      }
    }
  }
</script>
<template>
  <section v-show="mensajes.length > 0" class="mensajes">
    <mensaje v-for="mensaje in mensajes" :mensaje="mensaje">
    </mensaje>
  </section>
</template>
<style>
.mensajes {
  display: block;
  margin-top: 20px;
}
</style>