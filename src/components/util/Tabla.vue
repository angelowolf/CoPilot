<script>
import $ from 'jquery'
require('datatables.net')
require('datatables.net-bs')

export default{
  props: {
    datos: Array,
    columnas: Array,
    nombre: {
      type: String,
      default: 'tabla'
    }
  },
  mounted: function () {
    console.log('montar')
    this.$nextTick(function () {
      $('#' + this.nombre).DataTable({
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
    },
    console.log(1)
    )
  }
}
</script>
<template>
   <table aria-describedby="example1_info" role="grid" :id="nombre" class="table table-bordered table-striped dataTable">
    <thead>
      <tr role="row">
        <th  aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc" v-for="columna in columnas">
          {{ columna | capitalize }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="even" role="row" v-for="dato in datos">
        <td class="sorting_1" v-for="columna in columnas">
          {{dato[columna]}}
        </td>
      </tr>
    </tbody>
  </table>
</template>