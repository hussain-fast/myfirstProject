<template>
  <div class="overflow-auto">
    <b-row>
      <b-col>
        <h5>All Jobs</h5>
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
        ></b-table>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
      </b-col>
    </b-row>
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
      headVariant: 'dark',
      perPage: 3,
      currentPage: 1,
      totalRows: 1,
      filter: null,
      fields: [
        { key: 'Created_At', sortable: true },
        'Reach_Time',
        'Load_Time',
        'Drop_Time',
        'Client_Name',
        'Origin',
        'Destination',
        'Destination',
        'Status'
      ],
      items: [
        {
          Created_At: '20-12-2019',
          Reach_Time: '06-12-2019',
          Load_Time: '06-12-2019',
          Drop_Time: '06-12-2019',
          Client_Name: 'Ahmed',
          Origin: 'Karachi',
          Destination: 'Hyderabad',
          Distance: '200 KM',
          Duration: '3 hours',
          Labours: '6',
          Status: 'complete'
        },
        {
          Created_At: '25-12-2019',
          Reach_Time: '06-12-2019',
          Load_Time: '06-12-2019',
          Drop_Time: '06-12-2019',
          Client_Name: 'Amin',
          Origin: 'Karachi',
          Destination: 'Hyderabad',
          Distance: '200 KM',
          Duration: '3 hours',
          Labours: '6',
          Status: 'complete'
        },
        {
          Created_At: '15-12-2019',
          Reach_Time: '06-12-2019',
          Load_Time: '06-12-2019',
          Drop_Time: '06-12-2019',
          Client_Name: 'Karim',
          Origin: 'Karachi',
          Destination: 'Hyderabad',
          Distance: '200 KM',
          Duration: '3 hours',
          Labours: '6',
          Status: 'cancel'
        },
        {
          Created_At: '10-12-2019',
          Reach_Time: '06-12-2019',
          Load_Time: '06-12-2019',
          Drop_Time: '06-12-2019',
          Client_Name: 'Naveed',
          Origin: 'Karachi',
          Destination: 'Hyderabad',
          Distance: '200 KM',
          Duration: '3 hours',
          Labours: '6',
          Status: 'complete'
        }
      ]
    }
  },
  computed: {
    rowss() {
      return this.itemss.length
    },
    itemss() {
      return this.$store.state.AllJobs
    }
  },
  beforeCreate() {
    this.$store.dispatch('get_all_jobs')
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
    }
  }
}
</script>
