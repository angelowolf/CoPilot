<template>
<transicion :nombre="'modal'">
  <div class="modal-mask" @click="close" v-show="show">
    <div class="modal-container" @click.stop>
      <slot></slot>
    </div>
  </div>
</transicion>
</template>
<script>
  import Transicion from './Transicion'
  export default {
    props: ['show', 'onClose'],
    methods: {
      close () {
        this.onClose()
      }
    },
    components: {
      Transicion
    },
    mounted () {
      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode === 27) {
          this.onClose()
        }
      })
    }
  }
</script>
