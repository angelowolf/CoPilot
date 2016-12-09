<script>
import Transicion from './../Transicion'
export default {
  props: ['notificacion'],
  data () {
    return {
      timer: null
    }
  },
  components: {
    Transicion
  },
  mounted () {
    let timeout = this.notificacion.hasOwnProperty('timeout') ? this.notificacion.timeout : true
    if (timeout) {
      let delay = this.notificacion.delay || 3000
      this.timer = setTimeout(function () {
        this.triggerClose(this.notificacion)
      }.bind(this), delay)
    }
  },
  methods: {
    triggerClose: function (notificacion) {
      clearTimeout(this.timer)
      this.$store.dispatch('removeNotification', notificacion)
    }
  }
}
</script>

<template>
  <transicion :nombre="'fade'">
    <div class="notification callout animated" :class="notificacion.type ? notificacion.type : 'secondary'">
      <button @click="triggerClose(notificacion)" class="close-button" aria-label="Close alert" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
      <h5 v-if="notificacion.title">{{notificacion.title}}</h5>
      <p>
        {{notificacion.text}}
      </p>
    </div>
  </transicion>
</template>

<style>
  .notification p {
    margin-right: 20px;
  }
</style>