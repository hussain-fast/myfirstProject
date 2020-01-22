<template>
  <div class="overflow-auto">
    <b-container>
      <!-- <b-row>
        <b-col
          ><div class="w-100">
            <b-button variant="danger" size="sm" class="float-right mt-3" @click="show = false">Delete Vehicle</b-button>
            <b-button variant="outline-primary" size="sm" class="float-right mt-3"><nuxt-link to="/vendor/vehicle">Add Vehicle</nuxt-link></b-button>
          </div></b-col
        >
      </b-row>-->
    </b-container>
    <b-row>
      <b-col sm="4" class="mt-1">
        <h5>Drivers List</h5>
      </b-col>
      <b-col sm="4" class="mt-1">
        <b-form-group label-cols-sm="3" label-align-sm="right" label-size="sm" label-for="filterInput" class="mb-3 mt=0">
          <b-input-group size="sm">
            <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search"></b-form-input>
            <!-- <b-input-group-append>
              <b-button variant="primary" size="sm" :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append> -->
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <nuxt-link to="/vendor/addDriver">
          <b-button variant="primary" size="sm" class="float-right">
            <fa :icon="['fas', 'plus']" />
          </b-button>
        </nuxt-link>
      </b-col>
    </b-row>

    <b-table
      :head-variant="headVariant"
      responsive
      bordered
      hover
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      sort-icon-left
      :filter="filter"
      :current-page="currentPage"
      @filtered="onFiltered"
      :fields="fields"
      :items="items"
      @row-clicked="myRowClickHandler"
    ></b-table>
    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
    <!-- <b-modal ref="my-modal" title="Enter following information">
      <div>
        <b-form-select v-model="selectedOrigin" :options="originOptions" size="sm"></b-form-select>
        <b-form-select v-model="selectedDestination" :options="destinationOptions" size="sm" class="mt-3"></b-form-select>
        <b-form-input v-model="price" type="number" size="sm" class="mt-3" placeholder="Enter your price"></b-form-input>
        <b-form-input v-model="commissionPrice" type="number" size="sm" class="mt-3" placeholder="Enter commission price"></b-form-input>
        <b-form-input id="firstName" size="sm" class="mt-3" placeholder="Enter driver first name"></b-form-input>
        <b-form-input id="lastName" size="sm" class="mt-3" placeholder="Enter driver last name"></b-form-input>
        <b-form-input v-model="mobileNo" type="number" size="sm" class="mt-3" placeholder="Enter driver mobile Number"></b-form-input>
        <b-form-input v-model="cnicNo" type="number" size="sm" class="mt-3" placeholder="Enter driver cnic Number"></b-form-input>
        <b-form-input id="drivingLicenceNo" size="sm" class="mt-3" placeholder="Enter driver driving licence number"></b-form-input>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="primary" size="sm" class="float-right" @click="show = false">Make Online</b-button>
        </div>
      </template>
    </b-modal> -->
  </div>
</template>
<script>
import consola from 'consola'
export default {
  name: 'Vendor',
  layout: 'vendor',
  meta: { type: 'vendor' },
  data() {
    return {
      sortBy: 'created_At',
      sortDesc: false,
      headVariant: 'dark',
      status: null,
      modelId: false,
      perPage: 3,
      currentPage: 1,
      totalRows: 1,
      filter: null,
      fields: [
        { key: 'Created_At', sortable: true },
        'Driver_Name',
        'Mobile_No',
        'Email',
        'CNIC',
        'Vehicle_Type',
        'Adda_Ref',
        { key: 'Balance', sortable: true },
        'Blocked',
        'Offline',
        'Status'
      ],
      // items: [
      //   {
      //     Created_At: '06-12-2019',
      //     Driver_Name: 'Shahid',
      //     Mobile_Number: '03334240436',
      //     Vehicle_Type: '22 Wheeler',
      //     Origin: 'Karachi',
      //     Balance: 'Rs:5000',
      //     Email: 'shahid@gmail.com',
      //     CNIC: '43301-8049115-7',
      //     Action: 'Active',
      //     Status: 'Unblocked'
      //   },
      //   {
      //     Created_At: '02-12-2019',
      //     Driver_Name: 'Karim',
      //     Mobile_Number: '03334240436',
      //     Vehicle_Type: '22 Wheeler',
      //     Origin: 'Karachi',
      //     Balance: 'Rs:3000',
      //     Email: 'shahid@gmail.com',
      //     CNIC: '43301-8049115-7',
      //     Action: 'Active',
      //     Status: 'blocked'
      //   },
      //   {
      //     Created_At: '08-12-2019',
      //     Driver_Name: 'Rahim',
      //     Mobile_Number: '03334240436',
      //     Vehicle_Type: '22 Wheeler',
      //     Origin: 'Karachi',
      //     Balance: 'Rs:1000',
      //     Email: 'shahid@gmail.com',
      //     CNIC: '43301-8049115-7',
      //     Action: 'Active',
      //     Status: 'blocked'
      //   },
      //   {
      //     Created_At: '03-12-2019',
      //     Driver_Name: 'Shahid',
      //     Mobile_Number: '03334240436',
      //     Vehicle_Type: '22 Wheeler',
      //     Origin: 'Karachi',
      //     Balance: 'Rs:4000',
      //     Email: 'shahid@gmail.com',
      //     CNIC: '43301-8049115-7',
      //     Action: 'inactive',
      //     Status: 'Unblocked'
      //   }
      // ],
      selectedOrigin: null,
      originOptions: [
        { value: null, text: 'Please select origin' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
      selected: [],
      selectedDestination: null,
      destinationOptions: [
        { value: null, text: 'Please select destnation' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ]
    }
  },
  computed: {
    rows() {
      return this.items.length
    },
    items() {
      return this.$store.state.VendorDrivers
    }
  },
  beforeCreate() {
    this.$store.dispatch('get_my_drivers')
    consola.info('Before Create')
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    myRowClickHandler(items) {
      this.selected = items
      const id = items.ID
      this.$router.push({
        path: '/vendor/driver_profile/' + id
      })
    }
  }
}
</script>
