<template>
  <b-card>
    <b-card-header>Add Driver</b-card-header>
    <b-card-body>
      <b-container fluid>
        <b-row>
          <driver-info :form="form" :show="show" :consoleCard="consoleCard" />
          <docs :show="show" :consoleCard="consoleCard" />
        </b-row>
      </b-container>
    </b-card-body>
    <b-card-footer footer-class="cardFoot">
      <div class="mt-3 clearfix">
        <b-button size="sm" @click="Save" variant="success" class="float-right">Update</b-button>
        <!-- <b-button size="sm" @click="reset" variant="info" class="float-right">Reset</b-button> -->
      </div>
    </b-card-footer>
  </b-card>
</template>
<script>
import consola from 'consola'
import driverInfo from '~/components/add_driver/general_info'
import docs from '~/components/add_driver/docs'
export default {
  data() {
    return {
      form: {
        name: { first: '', last: '' },
        vehicle: null,
        email: '',
        password: '',
        mobile: '',
        cnic: '',
        license: '',
        adda: null
      },
      show: true,
      consoleCard: false
    }
  },

  name: 'Vendor',
  components: { docs, 'driver-info': driverInfo },
  layout: 'vendor',
  meta: { type: 'vendor' },
  methods: {
    Save() {
      this.$store.dispatch('add_driver', this.form)
      consola.warn(this.form)
    },
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    reset() {
      this.$bus.$emit('form-reset')
    }
  }
}
</script>
<style scoped>
.cardFoot {
  padding: 0;
  border-top: 0;
}
</style>
