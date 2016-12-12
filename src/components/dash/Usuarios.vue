<template>
  <section class="content">
  <usuario-modal :show.sync="this.usuariosStore.mostrarModal"></usuario-modal>
    <div class="row">
      <div class="col-md-12">
        <button @click.prevent="nuevoUsuario()" class="btn btn-success pull-right">Añadir <i class="fa fa-plus"></i></button>
      </div>
    </div>
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12">
                  <!--<tabla :datos="usuariosStore.usuarios" :columnas="columnas" :nombre="'usuarios'"></tabla>-->
                  <tabla-datos :datos="usuariosFiltrados" :columnas="this.columnas" :titulos="this.titulos" :acciones="this.acciones"></tabla-datos>   
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import $ from 'jquery'
import {mapState} from 'vuex'
import TablaDatos from './../util/TablaDatos'
import UsuarioModal from './../usuario/UsuarioModal'

// Require needed datatables modules
require('datatables.net')
require('datatables.net-bs')

export default {
  name: 'Tables',
  components: {
    TablaDatos, UsuarioModal
  },
  computed: {
    ...mapState({
      usuariosStore: state => state.usuariosStore
    }),
    usuariosFiltrados () {
      let usuarios = this.usuariosStore.usuarios
      return usuarios
    }
  },
  methods: {
    nuevoUsuario () {
      this.$store.commit('SET_NUEVO_USUARIO', true)
      this.$store.commit('TOGGLE_MODAL_USUARIO')
    }
  },
  data () {
    return {
      columnas: ['id', 'nombre', 'apellido', 'usuario'],
      titulos: ['ID', 'Nombre', 'Apellido', 'Usuario'],
      acciones: [
        { nombre: 'verUsuario', icono: 'fa-search' },
        { nombre: 'eliminarUsuario', icono: 'fa-trash', clase: 'btn-danger' }
      ]
    }
  },
  created () {
    this.$store.dispatch('cargarUsuarios')
  }
}
</script>

<style>

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after, table.dataTable thead .sorting_asc:after, table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}
</style>