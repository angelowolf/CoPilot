<script>
  import Notificacion from './Notificacion'
  export default {
    components: {
      Notificacion
    },
    data () {
      return {
        notificaciones: this.$store.state.notificacionStore.notificaciones
      }
    },
    methods: {
      eliminarNotificacion (notificacion) {
        this.notificacionStore.dispatch('removeNotification', notificacion)
      }
    }
  }
</script>
<template>
  <div class="notifications">
    <notificacion v-for="notificacion in notificaciones" :notificacion="notificacion" @close-notificacion="eliminarNotificacion">
    </notificacion>
  </div>
</template>
<style>
    .notifications {
    position: fixed;
    right: 10px;
    top: 100px;
    width: 350px;
    z-index: 1;
  }
</style>