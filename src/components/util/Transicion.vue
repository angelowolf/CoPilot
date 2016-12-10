<script>
  export default {
    props: {
      nombre: String
    }
  }
</script>

<template>
  <transition :name="nombre"><slot></slot></transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  opacity: 1;
  transition: opacity .5s ease-in-out;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-enter, .modal-leave {
  opacity: 0;
}
</style>