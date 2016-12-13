<script>
import Vue from 'vue'
export default {
  props: {
    mensaje: {
      tipo: String,
      titulo: String,
      texto: String,
      direccion: {
        type: String,
        default: 'Down'
      },
      duracion: {
        type: Number,
        default: null
      },
      container: {
        type: String,
        default: '.mensajes'
      },
      mantenimiento: {
        type: String
      },
      mostrarCruz: Boolean
    }
  },
  data () {
    return {
      $_padre_: null,
      iconos: {
        normal: '',
        primary: 'arrow-circle-right',
        info: 'info-circle',
        success: 'check-circle',
        warning: 'exclamation-circle',
        danger: 'times-circle'
      },
      mostrar: true,
      countDown: null
    }
  },
  created () {
    let $padre = this.$padre
    if (!$padre) {
      let container = this.mensaje.container ? this.mensaje.container : '.mensajes'
      let padre = document.querySelector(container)
      if (!padre) {
        // Lazy creating `div.notifications` container.
        const clase = container.replace('.', '')
        const Mensajes = Vue.extend({
          name: 'Mensajes',
          render (h) {
            return h('div', {
              'class': {
                [`${clase}`]: true
              }
            })
          }
        })
        $padre = new Mensajes().$mount()
        document.body.appendChild($padre.$el)
      } else {
        $padre = padre.__vue__
      }
      // Hacked.
      this.$_padre_ = $padre
    }
  },
  mounted () {
    if (this.$_padre_) {
      this.$_padre_.$el.appendChild(this.$el)
      this.$padre = this.$_padre_
      delete this.$_padre_
    }
    this.iniciarCuentaRegresiva()
    if (this.mensaje.duracion > 0) {
      this.timer = setTimeout(() => this.cerrar(), this.mensaje.duracion)
    }
  },
  destroyed () {
    this.$el.remove()
  },
  computed: {
    transition () {
      return `bounce-${this.direccion}`
    },
    enterClass () {
      return `bounceIn${this.direccion}`
    },
    leaveClass () {
      return `bounceOut${this.direccion === 'Up' ? 'Down' : 'Up'}`
    }
  },
  methods: {
    cerrar () {
      clearTimeout(this.timer)
      this.mostrar = false
    },
    afterLeave () {
      this.$destroy()
    },
    icono () {
      return this.iconos[this.mensaje.tipo]
    },
    pluralizar (cantidad, palabra) {
      return cantidad > 1 ? cantidad + ' ' + palabra + 's' : ' 1 ' + palabra
    },
    tiempoRestante () {
      let t = Date.parse(this.mensaje.mantenimiento) - Date.parse(new Date())

      if (t > 0) {
        let segundos = Math.floor((t / 1000) % 60)
        let minutos = Math.floor((t / 1000 / 60) % 60)
        let horas = Math.floor((t / (1000 * 60 * 60)) % 24)
        let dias = Math.floor(t / (1000 * 60 * 60 * 24))
        dias = dias > 0 ? this.pluralizar(dias, 'día') + ', ' : ''
        horas = horas > 0 ? this.pluralizar(horas, 'hora') + ', ' : ''
        minutos = minutos > 0 ? this.pluralizar(minutos, 'minuto') : ''
        segundos = segundos > 0 ? ' y ' + this.pluralizar(segundos, 'segundo') : ''
        return dias + horas + minutos + segundos
      } else {
        return ''
      }
    },
    iniciarCuentaRegresiva () {
      if (this.mensaje.mantenimiento !== undefined) {
        this.countDown = this.tiempoRestante()
        setTimeout(this.iniciarCuentaRegresiva, 1000)
      }
    }
  }
}
</script>

<template>
  <transition
    :name="transition"
    mode="in-out"
    appear
    :appear-active-class="enterClass"
    :enter-active-class="enterClass"
    :leave-active-class="leaveClass"
    @after-leave="afterLeave"
  >
    <div class="animado" v-if="mostrar">
      <div :class="['alert', mensaje.tipo ? `alert-${mensaje.tipo}` : '', mensaje.mostrarCruz ? 'alert-dismissible' : '']">
      <button v-if="mensaje.mostrarCruz" @click.prevent="cerrar()" type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>
        <h4>
          <i v-if="mensaje.icono" :class="['icon fa', `fa-${mensaje.icono}`]"></i>
          <i v-else :class="['icon fa', `fa-${icono()}`]"></i>
           {{ mensaje.titulo }}
        </h4>
        {{ mensaje.texto }} {{this.countDown}}
      </div>
    </div>
  </transition>
</template>

<style>
.animado {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.mensajes {
  position: relative;
  pointer-events: none;
}
</style>