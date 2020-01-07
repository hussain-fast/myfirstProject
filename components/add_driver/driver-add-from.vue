<template>
  <div class="card">
    <h5 class="card-header text-left">Add Driver</h5>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>First Name</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="$v.firstname.$model"
              :class="{
                'is-invalid': $v.firstname.$error
              }"
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.firstname.required">first name is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Last Name</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="$v.lastname.$model"
              :class="{
                'is-invalid': $v.lastname.$error
              }"
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.lastname.required">Last name is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Email</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="$v.email.$model"
              :class="{
                'is-invalid': $v.email.$error
              }"
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.email.required">Email is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Password</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="$v.password.$model"
              :class="{
                'is-invalid': $v.password.$error
              }"
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.password.required">Password is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Mobile Number</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="$v.mobileNo.$model"
              :class="{
                'is-invalid': $v.mobileNo.$error
              }"
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.mobileNo.required">Mobile Number is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>CNIC Number</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="$v.cnicNo.$model"
              :class="{
                'is-invalid': $v.cnicNo.$error
              }"
            />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <div class="invalid-feedback">
              <span v-if="!$v.cnicNo.required">CNIC Number is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Driving Licence Number</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="$v.drivingLicenceNo.$model"
              :class="{
                'is-invalid': $v.drivingLicenceNo.$error
              }"
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
                'is-invalid': $v.vehicleType.$error
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
            <label>Adda</label>
            <select
              class="form-control"
              v-model.trim="$v.adda.$model"
              :class="{
                'is-invalid': $v.adda.$error
              }"
            >
              <option v-for="(make, index) in adda_list" :key="index" v-bind:value="index">
                {{ make.adda }}
              </option>
            </select>
            <div class="valid-feedback">Your adda name is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.vehicleType.required">Adda is required</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Profile Image</label>
            <b-form-file id="img" size="sm" class="form-control" />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <!-- <div class="invalid-feedback">
              <span v-if="!$v.drivingLicenceNo.required">CNIC Number is required</span>
            </div> -->
          </div>
          <div class="form-group col-md-6">
            <label>Scanned CNIC</label>
            <b-form-file id="img_cnic" size="sm" class="form-control" />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <!-- <div class="invalid-feedback">
              <span v-if="!$v.drivingLicenceNo.required">CNIC Number is required</span>
            </div> -->
          </div>
          <div class="form-group col-md-6">
            <label>Scanned Licence</label>
            <b-form-file id="img_licence" size="sm" class="form-control" />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <!-- <div class="invalid-feedback">
              <span v-if="!$v.drivingLicenceNo.required">CNIC Number is required</span>
            </div> -->
          </div>
          <div class="form-group col-md-6">
            <label>Scanned Registration Letter</label>
            <b-form-file id="img_regLetter" size="sm" class="form-control" />
            <!-- <div class="valid-feedback">Your vehicle number is valid!</div> -->
            <!-- <div class="invalid-feedback">
              <span v-if="!$v.drivingLicenceNo.required">CNIC Number is required</span>
            </div> -->
          </div>
        </div>
        <button type="submit" class="btn btn-sm btn-primary float-right">submit {{ submitstatus }}</button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, numeric, url } from 'vuelidate/lib/validators'
import consola from 'consola'
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
      adda: '',
      submitstatus: null
    }
  },
  computed: {
    list() {
      consola.success(this.$store.state.VechilesList)
      return this.$store.state.VechilesList
    },
    adda_list() {
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
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitstatus = 'Fail'
      } else {
        consola.success({
          first_name: this.firstname,
          last_name: this.lastname,
          email: this.email,
          password: this.password,
          mob_no: this.mobileNo,
          cnic_no: this.cnicNo,
          driving_license: this.drivingLicenceNo,
          vehicle: this.list[this.vehicleType].name,
          adda_ref: this.adda
        })
        this.$store.dispatch('add_driver', {
          first_name: this.firstname,
          last_name: this.lastname,
          email: this.email,
          password: this.password,
          mob_no: this.mobileNo,
          cnic_no: this.cnicNo,
          driving_license: this.drivingLicenceNo,
          vehicle: this.vehicleType,
          adda_ref: this.adda
        })
        this.submitstatus = 'Success'
      }
    }
  },
  add_driver({ commit }, data) {
    alert(data)
    return new Promise((resolve, reject) => {
      this.$axios
        .post('https://localhost:4443/test/add_vendor_driver', data)
        .then(({ data }) => {
          consola.success(data)
        })
        .catch(reject)
    })
  }
}
</script>
