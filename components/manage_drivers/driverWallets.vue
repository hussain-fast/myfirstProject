<template>
  <b-col sm="12" class="mt-3">
    <b-card :header="driverWalletHeader">
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
      headVariant: 'dark',
      driverWalletHeader: 'Driver Wallets',
      perPage: 3,
      currentPage: 1,
      items: []
      // items: [
      //  {
      //       '#': '1',
      //       Naration: 'Natration1',
      //       column3: 'some data',
      //       column4: 'some data',
      //       coulmn5: 'some data'
      //     }
      // ]
    }
  },
  computed: {},
  beforeCreate() {
    DB.ref('e-wallet/drivers')
      .child(this.$route.params.id)
      .once('value')
      .then((snap) => {
        console.log(snap.val().wallets)
        snap.forEach((ele) => {
          this.items.push({
            Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
            Narration: 'Driver receved from Client',
            Debit: '1000',
            Credit: '122'
          })
        })
      })

    // DB.ref('e-wallet/drivers')
    //   .Child('-La4fDr7qowD290kZcBZ')
    //   .once('value')
    //   .then((snap) => {
    //     snap.forEach((ele) => {
    //       this.items.push({
    //         Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
    //         Naration: ele.val().narration,
    //         debit: ele.val().debit,
    //         credit: ele.val().credit,
    //       })
    //     })
    //   })
  },
  mounted() {},
  methods: {}
}
</script>
