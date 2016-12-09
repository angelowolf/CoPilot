<template>
  <table id="table-id" class="table table-default"></table>
</template>
<script>
  import $ from 'jquery'
  export default {
    props: {
      tableData: Array,
      columnas: Array,
      titulos: Array
    },
    data () {
      return {
        headers: [],
        rows: [],
        dtHandle: null
      }
    },
    watch: {
      tableData (val, oldVal) {
        let vm = this
        vm.row = []
        // You should _probably_ check that this is changed data... but we'll skip that for this example.
        val.forEach(item => {
          // Fish out the specific column data for each item in your data set and push it to the appropriate place.
          // Basically we're just building a multi-dimensional array here. If the data is _already_ in the right format you could
          // skip this loop...
          let row = []

          if (vm.columnas !== undefined) {
            vm.columnas.forEach(columna => {
              row.push(item[columna])
            })
          }

          vm.rows.push(row)
        })

        // Here's the magic to keeping the DataTable in sync.
        // It must be cleared, new rows added, then redrawn!
        vm.dtHandle.clear()
        vm.dtHandle.rows.add(vm.rows)
        vm.dtHandle.draw()
      }
    },
    mounted () {
      this.titulos.forEach(titulo => {
        this.headers.push({title: titulo})
      })
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
    }
  }
</script>
