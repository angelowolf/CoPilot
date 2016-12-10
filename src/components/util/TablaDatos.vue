<template>
  <table id="table-id" class="table table-default"></table>
</template>

<script>
  import $ from 'jquery'

  export default {
    props: {
      datos: Array,
      columnas: Array,
      titulos: Array,
      acciones: Array
    },
    data () {
      return {
        headers: [],
        rows: [],
        dtHandle: null
      }
    },
    methods: {
      ejecutarAccion (accion, id) {
        this.$store.dispatch(accion, id)
      },
      renderizarBoton (accion) {
        let etiqueta = accion['etiqueta'] || ''
        let clase = accion['clase'] || 'btn-primary'
        let size = accion['size'] || 'btn-small'
        let icono = accion['icono'] ? '<i class="fa ' + accion['icono'] + '"></i>' : ''
        return '<button data-accion="' + accion['nombre'] + '" class="btn ' + size + ' ' + clase + '">' + icono + ' ' + etiqueta + '</button>'
      }
    },
    watch: {
      datos (val, oldVal) {
        let vm = this
        vm.row = []
        val.forEach(item => {
          let row = []
          if (vm.columnas !== undefined) {
            vm.columnas.forEach(columna => {
              row.push(item[columna])
            })
          }

          if (vm.acciones !== undefined) {
            let botones = ''
            vm.acciones.forEach(accion => {
              botones += this.renderizarBoton(accion)
            })
            row.push(botones)
          }
          vm.rows.push(row)
        })
        vm.dtHandle.clear()
        vm.dtHandle.rows.add(vm.rows)
        vm.dtHandle.draw()
      }
    },
    mounted () {
      this.titulos.forEach(titulo => {
        this.headers.push({title: titulo})
      })
      if (this.acciones !== undefined) {
        this.headers.push({title: 'Operaciones'})
      }
      this.dtHandle = $(this.$el).DataTable({
        columns: this.headers,
        data: this.rows,
        'language': {
          'sProcessing': 'Procesando...',
          'sLengthMenu': 'Mostrar _MENU_ registros',
          'sZeroRecords': 'No se encontraron resultados',
          'sEmptyTable': 'Ningún dato disponible en esta tabla',
          'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
          'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
          'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
          'sInfoPostFix': '',
          'sSearch': 'Buscar:',
          'sUrl': '',
          'sInfoThousands': ',',
          'sLoadingRecords': 'Cargando...',
          'oPaginate': {
            'sFirst': 'Primero',
            'sLast': 'Último',
            'sNext': 'Siguiente',
            'sPrevious': 'Anterior'
          },
          'oAria': {
            'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
            'sSortDescending': ': Activar para ordenar la columna de manera descendente'
          }
        }
      })
      $(document).on('click', '#table-id button', (e) => {
        e.preventDefault()
        let $this = $(e.currentTarget)
        let id = $this.parents('tr').find('td:first').text()
        this.ejecutarAccion($this.attr('data-accion'), id)
      })
    }
  }
</script>