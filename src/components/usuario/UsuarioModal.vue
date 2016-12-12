<template>
  <modal :show.sync="show" :on-close="close">
        <div class="modal-header">
            <h3>{{titulo}}</h3>
        </div>
        <button v-if="!this.usuariosStore.nuevo" class="btn btn-small btn-info" @click="editar=!editar">
          <i class="fa fa-pencil"></i>
        </button>
        <div class="modal-body">
            <label class="form-label">
                Nombre
                <input :disabled="editar && !this.usuariosStore.nuevo" v-model="u.nombre" class="form-control">
            </label>
            <label class="form-label">
                Apellido
                <input :disabled="editar && !this.usuariosStore.nuevo" v-model="u.apellido" class="form-control">
            </label>
            <label class="form-label">
                Usuario
                <input :disabled="editar && !this.usuariosStore.nuevo" v-model="u.usuario" class="form-control">
            </label>
        </div>

        <div class="modal-footer text-right">
          <button :disabled="editar && !this.usuariosStore.nuevo" class="btn btn-success" @click="guardar()">
            Guardar
          </button>
        </div>
    </modal>
</template>
<script>
import Modal from './../util/Modal'
import {mapState} from 'vuex'
import $ from 'jquery'

export default {
  props: ['show'],
  components: { Modal },
  computed: {
    ...mapState({
      usuariosStore: state => state.usuariosStore
    }),
    u () {
      this.usuario = $.extend({}, this.usuariosStore.usuarioSeleccionado)
      return this.usuario
    },
    titulo () {
      if (this.usuariosStore.nuevo) {
        return 'Nuevo Usuario'
      } else {
        return 'Usuario ' + this.usuario.nombre + ' ' + this.usuario.apellido
      }
    }
  },
  data () {
    return {
      editar: true,
      usuario: {
        nombre: '',
        apellido: '',
        usuario: ''
      }
    }
  },
  methods: {
    close () {
      this.$store.commit('TOGGLE_MODAL_USUARIO')
      this.$store.commit('SET_USUARIO', {})
      this.editar = true
    },
    guardar () {
      if (this.usuariosStore.nuevo) {
        this.$store.dispatch('insertarUsuario', this.usuario)
      } else {
        this.$store.dispatch('actualizarUsuario', this.usuario)
      }
    }
  }
}
</script>
<style>
* {
    box-sizing: border-box;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}

.modal-container {
    width: 500px;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.text-right {
    text-align: right;
}

.form-label {
    display: block;
    margin-bottom: 1em;
}

.form-label > .form-control {
    margin-top: 0.5em;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid #ddd;
}
</style>