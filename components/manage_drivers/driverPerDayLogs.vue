<template>
  <b-col sm="12" lg="4" class="mt-3">
    <b-card :header="header">
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
      header: 'Driver Per day Logs',
      headVariant: 'dark',
      perPage: 3,
      currentPage: 1,
      items: []
      // Day: '06 Dec 2019',
      //     Duration: '00:06:17'
    }
  },
  computed: {},
  beforeCreate() {
    DB.ref('sessions')
      .child('-La4fDr7qowD290kZcBZ')
      .once('value')
      .then((snap) => {
        console.log(snap.val())
        snap.forEach((ele) => {
          this.items.push({
            Login_Time: moment(ele.val().loginTime).format('MM-DD-YYYY'),
            Logout_Time: moment(ele.val().logoutTime).format('MM-DD-YYYY'),
            Durartion: ele.val().duration
          })
        })
      })
  },
  mounted() {},
  methods: {}
}
</script>
