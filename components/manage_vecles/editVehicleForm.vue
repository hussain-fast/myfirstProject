<template>
  <div class="card">
    <h5 class="card-header text-left">{{ IsCreating() == 'false' ? 'Add Vehicle' : 'Edit Vehicle' }}</h5>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Vehicle type</label>
            <select
              class="form-control"
              v-model.trim="$v.vehicleType.$model"
              :class="{
                'is-invalid': $v.vehicleType.$error,
                'is-valid': !$v.vehicleType.$invalid
              }"
            >
              <option v-for="(make, index) in list" :key="index" v-bind:value="index">
                {{ make.name }}
              </option>
            </select>
            <div class="valid-feedback">Your vehicle type is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.vehicleType.required">Vehicle type is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Vehicle Number</label>
            <input
              type="text"
              disabled
              class="form-control"
              v-model.trim="$v.vehicleNumber.$model"
              :class="{
                'is-invalid': $v.vehicleNumber.$error
              }"
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.vehicleNumber.required">Vehicle number is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Model Year</label>
            <input type="text" class="form-control" v-model="vehicleModel" />
          </div>
          <div class="form-group col-md-6">
            <label>Vehicle Make</label>
            <input type="text" class="form-control" v-model="vehicleMake" />
          </div>
        </div>
        <!-- <button type="submit" class="btn btn-sm btn-primary float-right">submit {{ submitstatus }}</button> -->
        <b-button variant="primary" size="sm" class="float-right" @click="editVehicle">
          Edit Vehicle
        </b-button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, numeric, url } from 'vuelidate/lib/validators'
import consola from 'consola'
import { auth, DB } from '~/plugins/firebase.js'
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      vehicleType: '',
      vehicleNumber: '',
      vehicleModel: '',
      vehicleMake: '',
      submitstatus: null
    }
  },
  computed: {
    list() {
      consola.success(this.$store.state.VechilesList)
      return this.$store.state.VechilesList
    }
  },
  created() {
    DB.ref('heavyVehicles')
      .child(this.$route.params.id)
      .once('value')
      .then((snap) => {
        console.log(snap.val())
        this.vehicleModel = snap.val().v_model
        this.vehicleType = snap.val().name
        this.vehicleNumber = snap.val().v_number
        this.vehicleMake = snap.val().v_make
      })

    this.$store.dispatch('get_VechilesList')
  },
  validations: {
    vehicleType: {
      required
    },
    vehicleNumber: {
      required
    }
  },
  methods: {
    submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitstatus = 'Fail'
      } else {
        consola.success({
          vehicleId: this.vehicleType,
          name: this.list[this.vehicleType].name,
          v_number: this.vehicleNumber,
          v_model: this.vehicleModel,
          v_make: this.vehicleMake
        })
        this.$store.dispatch('add_vehicle', {
          vehicleId: this.vehicleNumber,
          name: this.list[this.vehicleType].name,
          v_number: this.vehicleNumber,
          v_model: this.vehicleModel,
          v_make: this.vehicleMake
        })
        this.submitstatus = 'Success'
        // location.href = 'http://localhost:3000/vendor/vehicles'
      }
    },
    editVehicle() {
      const userid = firebase.auth().currentUser.uid
      //   alert('-' + this.vehicleNumber.toUpperCase())
      consola.success({
        vehicleId: '-' + this.vehicleNumber.toUpperCase(),
        name: this.list[this.vehicleType].name,
        v_number: this.vehicleNumber,
        v_model: this.vehicleModel,
        v_make: this.vehicleMake,
        uid: userid
      })
      this.$store.dispatch('edit_vendor_vehicle', {
        vehicleId: '-' + this.vehicleNumber.toUpperCase(),
        name: this.list[this.vehicleType].name,
        v_number: this.vehicleNumber,
        v_model: this.vehicleModel,
        v_make: this.vehicleMake,
        uid: userid,
        availability: false
      })
    },
    IsCreating() {
      return this.$route.params.id ? 'true' : 'false'
    }
  }
}
</script>
