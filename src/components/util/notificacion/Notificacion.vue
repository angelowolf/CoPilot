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
        this.cerrarNotificacion(this.notificacion)
      }.bind(this), delay)
    }
  },
  methods: {
    cerrarNotificacion: function (notificacion) {
      clearTimeout(this.timer)
      this.$store.dispatch('eliminarNotificacion', notificacion)
    }
  }
}
</script>

<template>
  <transicion :nombre="'fade'">
    <div class="notificacion animado" :class="notificacion.tipo && 'is-' + notificacion.tipo">
      <button @click="cerrarNotificacion(notificacion)" class="cerrar" aria-label="Cerrar notificación" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
      <h5 class="titulo" v-if="notificacion.titulo">{{notificacion.titulo}}</h5>
      <p>
        {{notificacion.texto}}
      </p>
    </div>
  </transicion>
</template>

<style>
.animado {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.notificacion {
  margin: 20px;
  position: relative;
  min-width: 240px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  pointer-events: all;
  background-color: whitesmoke;
  border-radius: 3px;
  padding: 16px 20px;
}
.notificaction:not(:last-child) {
  margin-bottom: 20px;
}
.notificacion .titulo {
  color: inherit;
  font-size: 18px;
  font-weight: 300;
  line-height: 1em;
  word-break: break-word;
}
.notificacion.is-primary {
  background-color: #00d1b2;
  color: white;
}
.notificacion.is-info {
  background-color: #3273dc;
  color: white;
}
.notificacion.is-success {
  background-color: #23d160;
  color: white;
}
.notificacion.is-warning {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}
.notificacion.is-danger {
  background-color: #ff3860;
  color: white;
}
.notificacion .cerrar {
  background-color: rgba(10, 10, 10, 0.1);
  border: none;
  border-radius: 0 3px;
  cursor: pointer;
  display: inline-block;
  float: right;
  margin: -16px -20px 0 20px;
  -webkit-touch-callout: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 24px;
  outline: none;
  position: relative;
  vertical-align: top;
  width: 24px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cerrar:before, .cerrar:after {
  background-color: white;
  content: "";
  display: block;
  height: 2px;
  left: 50%;
  margin-left: -25%;
  margin-top: -1px;
  position: absolute;
  top: 50%;
  width: 50%;
}
.cerrar:before {
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.cerrar:after {
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.cerrar:hover {
  background-color: rgba(10, 10, 10, 0.2);
}
.cerrar.is-small {
  height: 16px;
  width: 16px;
}
.cerrar.is-medium {
  height: 32px;
  width: 32px;
}
.cerrar.is-large {
  height: 40px;
  width: 40px;
}
</style>