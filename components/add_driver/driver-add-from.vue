<template>
  <div class="card">
    <h5 class="card-header text-left">Add Driver</h5>
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
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.firstname.required">first name is required</span>
              <span v-if="!$v.firstname.minLength">first name must have at least {{ $v.firstname.$params.minLength.min }} letters. </span>
              <!-- <span v-if="!$v.firstname.mixLength">first name must have at most {{ $v.firstname.$params.maxLength.max }} letters. </span> -->
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
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.lastname.required">Last name is required</span>
              <span v-if="!$v.lastname.minLength">Last name must have at least {{ $v.lastname.$params.minLength.min }} letters. </span>
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
            />
            <!-- <div class="valid-feedback">Your Email is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.email.required">Email is required</span>
              <span v-if="!$v.email.isUnique">Give email in format eg: ali@gmail.com</span>
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
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.password.required">Password is required</span>
              <span v-if="!$v.password.minLength">Password must contain atleast {{ $v.password.$params.minLength.min }} characters. </span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Mobile Number</label>
            <input
              v-model.trim="$v.mobileNo.$model"
              :class="{
                'is-invalid': $v.mobileNo.$error
              }"
              type="number"
              class="form-control"
              placeholder="eg: 923153132322   12-digits"
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.mobileNo.required">Mobile Number is required</span>
              <span v-if="!$v.mobileNo.minLength"
                >Must be in the format 923153132322 and must have {{ $v.mobileNo.$params.minLength.min }} digits.
              </span>
              <span v-if="!$v.mobileNo.maxLength">Mobile Number Must not have more than {{ $v.mobileNo.$params.maxLength.max }} digits. </span>
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
              placeholder="eg: 4220180941174    13-digits"
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.cnicNo.required">CNIC Number is required</span>
              <span v-if="!$v.cnicNo.minLength">Must have {{ $v.cnicNo.$params.minLength.min }} digits. </span>
              <span v-if="!$v.cnicNo.maxLength">Mobile Number Must not have more than {{ 13 }} digits. </span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Driving Licence Number</label>
            <input
              v-model.trim="$v.drivingLicenceNo.$model"
              :class="{
                'is-invalid': $v.drivingLicenceNo.$error
              }"
              type="text"
              class="form-control"
              placeholder="eg: 4220180941174#768"
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.drivingLicenceNo.required">Driving License Number is required</span>
              <span v-if="!$v.drivingLicenceNo.minLength"
                >Must have {{ $v.drivingLicenceNo.$params.minLength.min }} digits with # before last 3 digits.
              </span>
              <span v-if="!$v.drivingLicenceNo.maxLength"
                >Mobile Number Must not have more than {{ $v.drivingLicenceNo.$params.maxLength.max }} digits including #.
              </span>
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
            >
              <option v-for="ada in adda_list" :key="ada.id">{{ ada }}</option>
            </select>
            <div class="valid-feedback">Your adda name is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.vehicleType.required">Adda is required</span>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-sm btn-primary float-right">submit {{ submitstatus }}</button>
        <!-- <b-button variant="primary" size="sm" class="float-right" @click="editDriver">
          Edit river
        </b-button> -->
      </form>
    </div>
  </div>
</template>
<script>
import { required, minLength, maxLength, between, email } from 'vuelidate/lib/validators'
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
      required,
      minLength: minLength(3)
    },
    lastname: {
      required,
      minLength: minLength(3)
    },
    email: {
      required,
      email,
      isUnique(value) {
        // if (value === '') return true

        // eslint-disable-next-line
        var email_regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(email_regex.test(value))
          }, 350 + Math.random() * 300)
        })
      }
    },
    password: {
      required,
      minLength: minLength(6)
    },
    mobileNo: {
      required,
      minLength: minLength(12),
      maxLength: maxLength(12)
    },
    cnicNo: {
      required,
      minLength: minLength(13),
      maxLength: maxLength(13)
    },
    drivingLicenceNo: {
      required,
      minLength: minLength(16),
      maxLength: maxLength(16)
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
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitstatus = 'Fail'
      } else {
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
    // DB.ref('users')
    //   .child(this.$route.params.id)
    //   .once('value')
    //   .then((snap) => {
    //     console.log(snap.val())
    //     this.firstname = snap.val().first_name
    //     this.lastname = snap.val().last_name
    //     this.mobileNo = snap.val().mob_no
    //     this.email = snap.val().email
    //     this.cnicNo = snap.val().cnic_no
    //     this.drivingLicenceNo = snap.val().driving_license
    //     this.adda = snap.val().adda_ref
    //     this.vehicleType = snap.val().vehicle
    //   })
    this.$store.dispatch('get_VechilesList')
    this.$store.dispatch('get_adda_list')
  }
}
</script>
