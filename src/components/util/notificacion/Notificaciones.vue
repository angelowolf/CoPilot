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
  <div class="notificaciones">
    <notificacion v-for="notificacion in notificaciones" :notificacion="notificacion" @close-notificacion="eliminarNotificacion">
    </notificacion>
  </div>
</template>
<style>
.notificaciones {
  position: fixed;
  top: 50px;
  right: 0;
  z-index: 1257;
  pointer-events: none;
}

@media screen and (min-width: 769px) {
  .notificaciones {
      max-width: 320px;
  }
}
</style>