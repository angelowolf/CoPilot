<template>
  <modal :show.sync="show" :on-close="close">
        <div class="modal-header">
            <h3>New Post</h3>
        </div>

        <div class="modal-body">
            <label class="form-label">
                Title
                <input v-model="title" class="form-control">
            </label>
            <label class="form-label">
                Body
                <textarea v-model="body" rows="5" class="form-control"></textarea>
            </label>
        </div>

        <div class="modal-footer text-right">
            <button class="modal-default-button" @click="savePost()">
                Save
            </button>
        </div>
    </modal>
</template>
<script>
import Modal from './../util/Modal'
import {mapState} from 'vuex'
export default {
  props: ['show'],
  components: { Modal },
  computed: {
    ...mapState({
      usuariosStore: state => state.usuariosStore
    })
  },
  data () {
    return {
      title: '',
      body: ''
    }
  },
  methods: {
    close () {
      this.$store.commit('TOGGLE_MODAL_USUARIO')
      this.title = ''
      this.body = ''
    },
    savePost () {
      console.log('me cierro')
      this.close()
    }
  }
}
</script>
<style>
  Edit in JSFiddle
JavaScript
HTML
CSS
Result
Resources
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
    width: 300px;
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