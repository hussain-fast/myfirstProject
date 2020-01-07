<template>
  <div class="overflow-auto">
    <b-row>
      <b-col>
        <h5>New Jobs</h5>
      </b-col>
      <b-col sm="4" class="mt-3">
        <b-form-group label-cols-sm="3" label-align-sm="right" label-size="sm" label-for="filterInput" class="mb-0">
          <b-input-group size="sm">
            <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search"></b-form-input>
            <!-- <b-input-group-append>
              <b-button variant="primary" size="sm" :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append> -->
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          :head-variant="headVariant"
          responsive
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          sort-icon-left
          :filter="filter"
          :current-page="currentPage"
          @filtered="onFiltered"
          :fields="fields"
          :items="items"
          @row-clicked="myRowClickHandler"
          bordered
          hover
        ></b-table>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
        <!-- <modelForAcceptedStatus /> -->
        <!-- Model code starts here -->
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" lg="6">
        <b-modal size="lg" ref="model-pendingStatus" title="Request Detail">
          <div>
            <b-row>
              <b-col sm="4">
                <table class="table">
                  <thead v-if="selected.Client_Name">
                    <tr>
                      <th class="text-center" colspan="2">Client Details</th>
                    </tr>
                  </thead>
                  <tbody v-if="selected.Client_Name">
                    <tr>
                      <th>Client Name</th>
                      <td>{{ selected.Client_Name }}</td>
                    </tr>
                    <tr v-if="true">
                      <th>Client Number</th>
                      <td>{{ selected.Client_No }}</td>
                    </tr>
                  </tbody>
                  <tbody v-if="selected.Origin">
                    <tr>
                      <th>Origin</th>
                      <td>{{ selected.Origin }}</td>
                    </tr>
                    <tr v-if="selected.Destination">
                      <th>Destination</th>
                      <td>{{ selected.Destination }}</td>
                    </tr>
                    <tr v-if="selected.Vehicle_Type">
                      <th>Vehicle_Type</th>
                      <td>{{ selected.Vehicle_Type }}</td>
                    </tr>
                    <tr v-if="selected.Status">
                      <th>Status</th>
                      <td>{{ selected.Status }}</td>
                    </tr>
                  </tbody>
                </table>
              </b-col>
              <b-col sm="2">
                <!-- just for space -->
              </b-col>
              <b-col sm="4">
                <table class="table">
                  <thead>
                    <tr>
                      <th class="text-center" colspan="2">Request Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="selected.Created_At">
                      <th>Created_At</th>
                      <td>{{ selected.Created_At }}</td>
                    </tr>
                    <tr v-if="selected.Reach_Time">
                      <th>Reach_Time</th>
                      <td>{{ selected.Reach_Time }}</td>
                    </tr>
                    <tr v-if="selected.Load_Time">
                      <th>Load_Time</th>
                      <td>{{ selected.Load_Time }}</td>
                    </tr>
                    <!-- <tr v-if="transReq.data.oneWay !== null">
                        <th>Type</th>
                        <td>{{ transReq.data.oneWay ? 'One Way' : 'Two Way' }}</td>
                      </tr> -->
                    <tr v-if="selected.Drop_Time">
                      <th>Drop_Time</th>
                      <td>{{ selected.Drop_Time }}</td>
                    </tr>
                  </tbody>
                </table>
              </b-col>
            </b-row>
            <b-row v-if="selected.Status == 'pending'">
              <b-col sm="12">
                <b-form-group label="Vehicle*:" label-for="vehicle" description="Select Vehicle">
                  <b-form-select id="vehicle" v-model="vehicle" :options="vehicle_list">
                    <option value="null">Select Any Vehicle</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <template v-slot:modal-footer>
            <div class="w-100">
              <b-button variant="primary" size="sm" class="float-right" v-if="selected.Status == 'pending'" @click="allotVehicle">Allot</b-button>
              <b-button variant="primary" size="sm" class="float-right" v-if="selected.Status == 'allot'" @click="acceptRequest">Accept</b-button>
              <b-button variant="primary" size="sm" class="float-right" v-if="selected.Status == 'accept'" @click="completeRequest"
                >Complete</b-button
              >
            </div>
          </template>
        </b-modal>
        <!-- Model code end here -->\
      </b-col>
    </b-row>
  </div>
</template>
<script>
import consola from 'consola'
// import modelForPendingStatus from './../../../components/manage_requests/modelForPendingStatus'
// import modelForAcceptedStatus from './../../../components/manage_requests/modelForAcceptedStatus'
export default {
  name: 'Vendor',
  layout: 'vendor',
  meta: { type: 'vendor' },
  components: {
    // modelForPendingStatus
    // modelForAcceptedStatus
  },
  data() {
    return {
      sortBy: 'created_At',
      sortDesc: false,
      headVariant: 'dark',
      selected: [],
      vehicle: '',
      vehicle_list: ['22 wheeler', '18 wheeler', '12 wheeler', '26 wheeler', 'Other'],
      perPage: 3,
      currentPage: 1,
      totalRows: 1,
      filter: null,
      rows: 5,
      fields: [
        { key: 'Created_At', sortable: true },
        'Client_Id',
        'Load_Time',
        'Request_Date',
        'Origin',
        'Destination',
        'Is_Hire',
        'Vehicle_Id',
        'Price',
        'Commission',
        'Status'
      ],

      items: [
        {
          Created_At: '10-12-2019',
          Reach_Time: '08-12-2019',
          Load_Time: '06-12-2019',
          Drop_Time: '06-12-2019',
          Client_Name: 'Ahmed',
          Client_No: '03023273270',
          Vehicle_Type: '22 Wheeler',
          Origin: 'Karachi',
          Destination: 'Hyderabad',
          Distance: '200 KM',
          Duration: '3 hours',
          Status: 'pending'
        },
        {
          Created_At: '08-12-2019',
          Reach_Time: '06-12-2019',
          Load_Time: '06-12-2019',
          Drop_Time: '06-12-2019',
          Client_Name: 'Ahmed',
          Client_No: '03023273270',
          Vehicle_Type: '22 Wheeler',
          Origin: 'Karachi',
          Destination: 'Hyderabad',
          Distance: '200 KM',
          Duration: '3 hours',
          Status: 'allot'
        },
        {
          Created_At: '02-12-2019',
          Reach_Time: '06-12-2019',
          Load_Time: '06-12-2019',
          Drop_Time: '06-12-2019',
          Client_Name: 'Raheel',
          Client_No: '03023273270',
          Vehicle_Type: '22 Wheeler',
          Origin: 'Karachi',
          Destination: 'Hyderabad',
          Distance: '200 KM',
          Duration: '3 hours',
          Status: 'accept'
        },
        {
          Created_At: '04-12-2019',
          Reach_Time: '06-12-2019',
          Load_Time: '06-12-2019',
          Drop_Time: '06-12-2019',
          Client_Name: 'Kamran',
          Client_No: '03023273270',
          Vehicle_Type: '22 Wheeler',
          Origin: 'Karachi',
          Destination: 'Hyderabad',
          Distance: '200 KM',
          Duration: '3 hours',
          Status: 'allot'
        }
      ]
    }
  },
  computed: {
    rowss() {
      return this.items.length
    },
    itemss() {
      return this.$store.state.NewJobs
    }
    // return() {
    //   Commission_Price = (10 / 100) * price
    // }
  },
  // beforeCreate() {
  //   this.$store.dispatch('get_new_jobs')
  //   consola.info('Before Create')
  // },
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
    myRowClickHandler(item) {
      this.selected = item
      this.$refs['model-pendingStatus'].show()
      // this.$refs['my-modal'].hide();
    },
    allotVehicle() {},
    acceptRequest() {},
    completeRequest() {}
    // VAction(id, ty) {
    //   consola.success(id, ty)
    // }
  }
}
</script>
