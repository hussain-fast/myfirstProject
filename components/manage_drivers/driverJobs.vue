<template>
  <b-col sm="12" class="mt-3">
    <b-card :header="driverJobsHeader">
      <b-container fluid>
        <div class="overflow-auto">
          <b-table :head-variant="headVariant" responsive bordered hover :items="items"></b-table>
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
        </div>
      </b-container>
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
      Created_At: '',
      headVariant: 'dark',
      driverJobsHeader: 'Driver Jobs',
      perPage: 3,
      currentPage: 1,
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
      first_name: '',
      items: []
      // items: [
      //   {
      //     Created_At: this.Created_At,
      //     Reach_Time: '06-12-2019',
      //     Load_Time: '06-12-2019',
      //     Drop_Time: '06-12-2019',
      //     Client_Name: 'Ahmed',
      //     Origin: 'Karachi',
      //     Destination: 'Hyderabad',
      //     Distance: '200 KM',
      //     Duration: '3 hours',
      //     Labours: '6'
      //   }
      // ]
    }
  },
  computed: {},
  beforeCreate() {
    DB.ref('requests/heavyVehicles')
      .orderByChild('driverId')
      .equalTo(this.$route.params.id)
      .once('value')
      .then((snap) => {
        snap.forEach((ele) => {
          this.items.push({
            Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
            vehicleId: ele.val().vehicleId,
            vendorId: ele.val().vendorId,
            Origin: ele.val().orgText,
            Destination: ele.val().desText,
            Driver_Name: ele.val().driverId,
            Price: ele.val().price,
            Commission_Price: ele.val().comission
          })
        })
      })
  },
  mounted() {},
  methods: {}
}
</script>
