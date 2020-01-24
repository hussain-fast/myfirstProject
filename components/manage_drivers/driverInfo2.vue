<template>
  <b-col sm="12" lg="12">
    <b-card :header="driverInfoHeader">
      <div>
        <b-button variant="primary" size="sm" class="float-right" @click="editDriver">
          <fa :icon="['fas', 'edit']" />
        </b-button>
        <b-container fluid>
          <b-row>
            <b-col sm="4">
              <table class="table">
                <thead>
                  <tr>
                    <th colspan="2">
                      <h6>General Information</h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>First Name</th>
                    <td>{{ this.first_name }}</td>
                  </tr>
                  <tr>
                    <th>Last Name</th>
                    <td>{{ this.last_name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ this.email }}</td>
                  </tr>
                  <tr>
                    <th>Mobile No</th>
                    <td>{{ this.mob_no }}</td>
                  </tr>
                  <tr>
                    <th>CNIC No</th>
                    <td>{{ this.cnic_no }}</td>
                  </tr>
                  <tr>
                    <th>Driver License</th>
                    <td>{{ this.driving_license }}</td>
                  </tr>
                  <tr>
                    <th>Adda Name</th>
                    <td>{{ this.adda_ref }}</td>
                  </tr>
                </tbody>
              </table>
            </b-col>
            <b-col sm="4">
              <table class="table">
                <thead>
                  <tr>
                    <th colspan="2">
                      <h6>Vehicle Information</h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Vehicle Type</th>
                    <td>{{ this.vehicle }}</td>
                  </tr>
                  <tr>
                    <th>Model Year</th>
                    <td>{{ this.v_model_year }}</td>
                  </tr>
                  <tr>
                    <th>Vehicle Number</th>
                    <td>{{ this.v_number }}</td>
                  </tr>
                  <tr>
                    <th>Vehicle Make</th>
                    <td>{{ this.v_make }}</td>
                  </tr>
                </tbody>
              </table>
            </b-col>
            <b-col sm="4">
              <table class="table">
                <thead>
                  <tr>
                    <th colspan="2">
                      <h6>Documents</h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Profile image</th>

                    <!-- <a class="btn btn-info btn-sm mar-bot-5">absent</a> -->
                    <button class="btn btn-danger btn-sm" v-if="true">
                      <fa :icon="['fas', 'exclamation']" />
                    </button>
                    <button class="btn btn-info btn-sm mar-bot-5" v-if="false"></button>
                  </tr>
                  <tr>
                    <th>Scanned cnic</th>
                    <!-- <a class="btn btn-info btn-sm mar-bot-5"></a> -->
                    <button class="btn btn-danger btn-sm mar-bot-5" v-if="true">
                      <fa :icon="['fas', 'exclamation']" />
                    </button>
                    <button class="btn btn-info btn-sm mar-bot-5" v-if="false"></button>
                  </tr>
                  <tr>
                    <th>Scanned Licence</th>
                    <!-- <a class="btn btn-info btn-sm mar-bot-5"></a> -->
                    <button class="btn btn-danger btn-sm mar-bot-5" v-if="true">
                      <fa :icon="['fas', 'exclamation']" />
                    </button>
                    <button class="btn btn-info btn-sm mar-bot-5" v-if="false"></button>
                  </tr>
                  <tr>
                    <th>Scanned Registration Letter</th>
                    <!-- <a class="btn btn-info btn-sm mar-bot-5"></a> -->
                    <button class="btn btn-danger btn-sm mar-bot-5" v-if="true">
                      <fa :icon="['fas', 'exclamation']" />
                    </button>
                    <button class="btn btn-info btn-sm mar-bot-5" v-if="false"></button>
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-card>
  </b-col>
</template>
<script>
import Vuex from 'vuex'
import consola from 'consola'
import moment from 'moment'
import { auth, DB } from '~/plugins/firebase.js'
export default {
  name: 'Vendor',
  layout: 'vendor',
  meta: { type: 'vendor' },
  data() {
    return {
      driverInfoHeader: 'Driver Information',
      vehicle: '',
      v_make: '',
      v_number: '',
      v_model_year: '',
      adda_ref: '',
      driving_license: '',
      cnic_no: '',
      email: '',
      mob_no: '',
      last_name: '',
      first_name: ''
    }
  },
  computed: {},
  beforeCreate() {
    DB.ref('users')
      .child(this.$route.params.id)
      .once('value')
      .then((snap) => {
        console.log(snap.val())
        this.first_name = snap.val().first_name
        this.last_name = snap.val().last_name
        this.mob_no = snap.val().mob_no
        this.email = snap.val().email
        this.cnic_no = snap.val().cnic_no
        this.driving_license = snap.val().driving_license
        this.adda_ref = snap.val().adda_ref
        this.v_model_year = snap.val().v_model_year
        this.v_number = snap.val().v_number
        this.v_make = snap.val().v_make
        this.vehicle = snap.val().vehicle
      })
  },
  mounted() {},
  methods: {
    editDriver(item) {
      this.selected = item
      const id = this.$route.params.id
      this.$router.push({
        path: '/vendor/editDriver/' + id
      })
    }
  }
}
</script>
