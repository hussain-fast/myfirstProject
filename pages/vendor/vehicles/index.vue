<template>
  <div class="overflow-auto">
    <b-row>
      <b-col sm="4" class="mt-3">
        <h5>vendor vehicles</h5>
      </b-col>
      <b-col sm="4" class="mt-3">
        <b-form-group label-cols-sm="3" label-align-sm="right" label-size="sm" label-for="filterInput" class="mb-0">
          <b-input-group size="sm">
            <b-form-input id="filterInput" v-model="filter" type="search" placeholder="Type to Search"></b-form-input>
            <!-- <b-input-group-append>
              <b-button variant="primary" size="sm" :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append> -->
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-button @click="show = false" size="sm" variant="danger" class="float-right mt-3"> <fa :icon="['fas', 'trash']" /> </b-button>
        <nuxt-link to="/vendor/addVehicle">
          <b-button variant="primary" size="sm" class="float-right mt-3">
            <fa :icon="['fas', 'plus']" />
          </b-button>
        </nuxt-link>
        <!-- <button class="float-right mt-3"><nuxt-link to="/vendor/vehicle">Add Vehicle</nuxt-link></button> -->
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-table
          :head-variant="headVariant"
          :sort-desc.sync="sortDesc"
          :sort-by.sync="sortBy"
          :items="items"
          :filter="filter"
          :current-page="currentPage"
          @filtered="onFiltered"
          @row-clicked="myRowClickHandler"
          :fields="fields"
          responsive
          bordered
          hover
          sort-icon-left
          class="mt-0"
        >
          <template v-slot:cell(Status)="row">
            <!-- <button @click="VAction(row.item.ID, !row.item.Status)">{{ row.item.Status ? 'Active' : 'InActive' }}</button> -->
            <div v-if="row.item.availability == true">
              <toggle-button :value="true" sync="true" @change="rowClick(row.item)"></toggle-button>
            </div>
            <div v-if="row.item.availability == false">
              <toggle-button :value="false" sync="true" @change="rowClick(row.item.availability)"></toggle-button>
            </div>
          </template>
          <template v-slot:cell(selected)="{ rowSelected }">
            <template v-if="rowSelected">
              <span aria-hidden="true">&check;</span>
              <span class="sr-only">Selected</span>
            </template>
            <template v-else>
              <span aria-hidden="true">&nbsp;</span>
              <span class="sr-only">Not selected</span>
            </template>
          </template>
        </b-table>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
      </b-col>
    </b-row>
    <b-modal ref="my-modal" title="Enter following information" @submit.prevent="submitForm">
      <div>
        <b-row>
          <b-col sm="6">
            <b-form-group description="Select Origin">
              <b-form-select
                id=""
                v-model.trim="$v.Origin.$model"
                :class="{
                  'is-invalid': $v.Origin.$error
                }"
                :options="originOptions"
                size="sm"
              ></b-form-select>
              <div class="invalid-feedback">
                <span v-if="!$v.Origin.required">Vehicle Origin is required</span>
              </div>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group description="Select Destination">
              <b-form-select v-model="Destination" :options="destinationOptions" size="sm"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group description="Select driver">
              <b-form-select
                id="Driver_Name"
                v-model.trim="$v.Driver_Name.$model"
                :class="{
                  'is-invalid': $v.Driver_Name.$error
                }"
                :options="list"
                size="sm"
              ></b-form-select>
              <div class="invalid-feedback">
                <span v-if="!$v.Driver_Name.required">Driver Name is required</span>
              </div>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group description="Enter Price">
              <b-form-input
                v-model.trim="$v.Price.$model"
                :class="{
                  'is-invalid': $v.Price.$error
                }"
                type="number"
                size="sm"
                placeholder="Enter your price"
              ></b-form-input>
              <div class="invalid-feedback">
                <span v-if="!$v.Price.required">Price is required</span>
              </div>
            </b-form-group>
          </b-col>
          <!-- <b-col sm="6">
            <b-form-group description="Commission Price">
              <b-form-input v-model="selected.Commission_Price" type="number" size="sm" placeholder="Enter commission price" readonly></b-form-input>
            </b-form-group>
          </b-col> -->
        </b-row>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <!-- <button type="submit" class="btn btn-sm btn-primary float-right">submit {{ submitstatus }}</button> -->
          <b-button @click="submitForm(selected)" variant="primary" size="sm" class="float-right">
            Make Live
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import consola from 'consola'
import { required, numeric, url } from 'vuelidate/lib/validators'
import cities from '~/assets/cities.json'
export default {
  name: 'Vendor',
  layout: 'vendor',
  meta: { type: 'vendor' },
  // selectMode: ['multi'],
  data() {
    return {
      sortBy: 'created_At',
      sortDesc: false,
      statusToggle: false,
      selected: [],
      vehicle_id: '',
      headVariant: 'dark',
      modelId: false,
      perPage: 3,
      currentPage: 1,
      totalRows: 1,
      Price: '',
      Commission_Price: '',
      filter: null,
      Origin: '',
      Destination: '',
      Driver_Name: '',
      submitstatus: null,
      fields: [
        { key: 'Created_At', sortable: true },
        { key: 'Vehicle_Name', sortable: false },
        { key: 'Vehicle_Number', sortable: false },
        'Origin',
        'Destination',
        'Driver_Name',
        { key: 'Price', sortable: true },
        { key: 'Commission_Price', sortable: true },
        { key: 'Status', sortable: false }
      ],
      // item: [
      //   {
      //     ID: 'asas',
      //     Created_At: '04-12-2019',
      //     Vehicle_Name: 'Truck',
      //     Vehicle_Number: 'BXC-3324',
      //     Origin: 'Karachi',
      //     Destination: 'Lahore',
      //     Driver_Name: 'Fateh',
      //     Price: 40000,
      //     Commission_Price: '4000',
      //     Status: 'Active'
      //   },
      //   {
      //     Created_At: '04-12-2019',
      //     Vehicle_Name: '22 Wheeler',
      //     Vehicle_Number: 'BXC-3324',
      //     Origin: 'Karachi',
      //     Destination: 'Multan',
      //     Driver_Name: 'Amin',
      //     Price: 30000,
      //     Commission_Price: '3000',
      //     Status: 'Active'
      //   },
      //   {
      //     Created_At: '04-12-2019',
      //     Vehicle_Name: '18 Wheeler',
      //     Vehicle_Number: 'BXC-3324',
      //     Origin: 'Sukkur',
      //     Destination: 'Hyderad',
      //     Driver_Name: 'Abas',
      //     Price: 15000,
      //     Commission_Price: '1500',
      //     Status: 'Active'
      //   },
      //   {
      //     Created_At: '04-12-2019',
      //     Vehicle_Name: '12 Wheeler',
      //     Vehicle_Number: 'BXC-3324',
      //     Origin: 'Karachi',
      //     Destination: 'Lahore',
      //     Driver_Name: 'Fateh',
      //     Price: 40000,
      //     Commission_Price: '4000',
      //     Status: 'Active'
      //   }
      // ],
      selectedOrigin: null,
      originOptions: cities,
      selectedDestination: null,
      destinationOptions: cities,
      driverOptions: []
    }
  },
  computed: {
    // Instead of VechilesList , VendorDriversList will be used
    list() {
      consola.success('HII' + this.$store.state.VendorDriversList)
      return this.$store.state.VendorDriversList
    },
    rows() {
      return this.items.length
    },
    items() {
      return this.$store.state.HeavyVechiles
    }
    // return() {
    //   Commission_Price = (10 / 100) * price
    // }
  },
  created() {
    this.$store.dispatch('get_VendorDriversList')
  },
  validations: {
    Origin: {
      required
    },
    Destination: {
      required
    },
    Driver_Name: {
      required
    },
    Price: {
      required
    }
  },
  beforeCreate() {
    this.$store.dispatch('get_my_vehicles')
    this.$store.dispatch('get_my_drivers')
    this.$store.dispatch('get_adda_list')
    consola.info('Before Create')
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitstatus = 'Fail'
      } else {
        consola.success({
          origin: this.Origin,
          destination: this.Destination,
          driverId: this.Driver_Name,
          price: this.Price,
          vehicleId: 'ket-123456' // this.vehicle_id
        })
        this.$store.dispatch('make_vehicle_live', {
          origin: this.Origin,
          destination: this.Destination,
          driverId: this.Driver_Name,
          price: this.Price,
          vehicleId: 'ket-123456' // this.vehicle_id
        })
        this.submitstatus = 'Success'
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    rowClick(item) {
      this.selected = item
      // this vehicle_id will be used while making vehicle live
      // this.vehicle_id = x
      // alert('this.vendorId   ' + x)
      // alert('availabilty : ' + item)
      if (!item.availability) {
        this.$refs['my-modal'].show()
      }

      // this.$refs['my-modal'].hide();
    },
    myRowClickHandler(items) {
      // alert('you clicked the row')
      this.selected = items
      this.$router.push({
        path: '/vendor/addVehicle'
      })
      // alert('Origin : ' + item.Origin)
      // this.$refs['my-modal'].show()
      // this.$refs['my-modal'].hide();
    },
    VAction(id, ty) {
      consola.success(id, ty)
    }
  }
}
</script>
