<template>
  <div class="card">
    <h5 class="card-header text-left">Edit Driver</h5>
    <!-- IsCreating() == 'false' ? 'Add Driver' : 'Edit Driver' -->
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>First Name</label>
            <input
              v-model.trim="$v.firstname.$model"
              :class="{
                'is-invalid': $v.firstname.$error
              }"
              type="text"
              class="form-control"
              required
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.firstname.required">first name is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Last Name</label>
            <input
              v-model.trim="$v.lastname.$model"
              :class="{
                'is-invalid': $v.lastname.$error
              }"
              type="text"
              class="form-control"
              required
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.lastname.required">Last name is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Email</label>
            <input
              v-model.trim="$v.email.$model"
              :class="{
                'is-invalid': $v.email.$error
              }"
              type="email"
              class="form-control"
              required
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.email.required">Email is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Password</label>
            <input
              v-model.trim="$v.password.$model"
              :class="{
                'is-invalid': $v.password.$error
              }"
              type="password"
              class="form-control"
              required
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.password.required">Password is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Mobile Number</label>
            <input
              v-model.trim="$v.mobileNo.$model"
              :class="{
                //'is-invalid': $v.mobileNo.$error
              }"
              type="number"
              class="form-control"
              placeholder="923153132322 - 12 digits"
              required
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.mobileNo.required">Mobile Number is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>CNIC Number</label>
            <input
              v-model.trim="$v.cnicNo.$model"
              :class="{
                'is-invalid': $v.cnicNo.$error
              }"
              type="number"
              class="form-control"
              required
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.cnicNo.required">CNIC Number is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Driving Licence Number</label>
            <input
              v-model.trim="$v.drivingLicenceNo.$model"
              :class="{
                'is-invalid': $v.drivingLicenceNo.$error
              }"
              type="number"
              class="form-control"
              required
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.drivingLicenceNo.required">CNIC Number is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Vehicle type</label>
            <select
              class="form-control"
              v-model.trim="$v.vehicleType.$model"
              :class="{
                'is-invalid': $v.vehicleType.$error,
                'is-valid': !$v.vehicleType.$invalid
              }"
              required
            >
              <option v-for="vehicle in vehicleTypeList" :key="vehicle">
                {{ vehicle }}
              </option>
            </select>
            <div class="valid-feedback">Your vehicle type is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.vehicleType.required">Vehicle type is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Adda</label>
            <select
              v-model.trim="$v.adda.$model"
              :class="{
                'is-invalid': $v.adda.$error
              }"
              class="form-control"
              required
            >
              <option v-for="ada in adda_list" :key="ada.id">{{ ada }}</option>
            </select>
            <div class="valid-feedback">Your adda name is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.vehicleType.required">Adda is required</span>
            </div>
          </div>
        </div>
        <!-- <button type="submit" class="btn btn-sm btn-primary float-right">submit {{ submitstatus }}</button> -->
        <b-button variant="primary" size="sm" class="float-right" @click="editDriver">
          Edit Driver
        </b-button>
      </form>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import consola from 'consola'
import firebase from '@/plugins/firebase'
import { auth, DB } from '~/plugins/firebase.js'
import cities from '~/assets/cities.json'
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      mobileNo: '',
      cnicNo: '',
      drivingLicenceNo: '',
      vehicleType: '',
      vehicleTypeList: ['Shehzor', 'Pickup', 'Truck', 'Mazda', 'Others'],
      adda: '',
      adda_list: cities, // ['karachi', 'lahore', 'quetta'],
      submitstatus: null
    }
  },
  computed: {
    vender_driver() {
      consola.success(this.$store.state.add_driver)
      return this.$store.state.add_driver
    },
    list() {
      consola.success(this.$store.state.VechilesList)
      return this.$store.state.VechilesList
    },
    adalist() {
      return this.$store.state.adda_list
    }
  },
  validations: {
    firstname: {
      required
    },
    lastname: {
      required
    },
    email: {
      required
    },
    password: {
      required
    },
    mobileNo: {
      required
    },
    cnicNo: {
      required
    },
    drivingLicenceNo: {
      required
    },
    vehicleType: {
      required
    },
    adda: {
      required
    }
  },
  methods: {
    submitForm() {
      const userid = firebase.auth().currentUser.uid
      console.log(userid)
      consola.success({
        uid: userid,
        first_name: this.firstname,
        last_name: this.lastname,
        email: this.email,
        mob_no: this.mobileNo,
        password: this.password,
        vehicle: this.vehicleType,
        cnic_no: this.cnicNo,
        driving_license: this.drivingLicenceNo,
        adda_ref: this.adda
      })
      this.$store.dispatch('add_driver', {
        uid: userid,
        first_name: this.firstname,
        last_name: this.lastname,
        email: this.email,
        mob_no: this.mobileNo,
        password: this.password,
        vehicle: this.vehicleType,
        cnic_no: this.cnicNo,
        driving_license: this.drivingLicenceNo,
        adda_ref: this.adda
      })

      this.submitstatus = 'Success'
      location.href = 'http://localhost:3000/vendor/drivers'
      // this.$router.push({
      //   path: '/vendor/drivers'
      // })
    }
  },
  editDriver() {
    const userid = firebase.auth().currentUser.uid
    console.log(userid)
    consola.success({
      uid: userid,
      first_name: this.firstname,
      last_name: this.lastname,
      email: this.email,
      mob_no: this.mobileNo,
      password: this.password,
      vehicle: this.vehicleType,
      cnic_no: this.cnicNo,
      driving_license: this.drivingLicenceNo,
      adda_ref: this.adda
    })
    this.$store.dispatch('edit_vendor_driver', {
      uid: userid,
      first_name: this.firstname,
      last_name: this.lastname,
      email: this.email,
      mob_no: this.mobileNo,
      password: this.password,
      vehicle: this.vehicleType,
      cnic_no: this.cnicNo,
      driving_license: this.drivingLicenceNo,
      adda_ref: this.adda
    })
  },

  IsCreating() {
    return this.$route.params.id ? 'true' : 'false'
  },
  created() {
    DB.ref('users')
      .child(this.$route.params.id)
      .once('value')
      .then((snap) => {
        console.log(snap.val())
        this.firstname = snap.val().first_name
        this.lastname = snap.val().last_name
        this.mobileNo = snap.val().mob_no
        this.email = snap.val().email
        this.cnicNo = snap.val().cnic_no
        this.drivingLicenceNo = snap.val().driving_license
        this.adda = snap.val().adda_ref
        this.vehicleType = snap.val().vehicle
      })
    this.$store.dispatch('get_VechilesList')
    this.$store.dispatch('get_adda_list')
  }
}
</script>
