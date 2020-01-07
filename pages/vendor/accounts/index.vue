<template>
  <div class="overflow-auto">
    <b-row>
      <b-col>
        <h5>Accounts</h5>
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
          :fields="fields"
          :items="items"
          :current-page="currentPage"
          @filtered="onFiltered"
          @row-clicked="myRowClickHandler"
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
  components: {},
  data() {
    return {
      sortBy: 'Date',
      // sortDesc: false,
      headVariant: 'dark',
      perPage: 3,
      currentPage: 1,
      totalRows: 1,
      filter: null,
      fields: [
        'S_NO',
        { key: 'Date', sortable: true },
        'Invoice_No',
        { key: 'Price', sortable: true },
        'Commission',
        { key: 'Commission_Amount', sortable: true },
        { key: 'Income_Amount', sortable: true }
      ],
      items: [
        {
          S_No: '1',
          Date: '15-12-2019',
          Invoice_No: '2222245',
          Price: '1000',
          Commission: '10%',
          Commission_Amount: '100',
          Income_Amount: '900'
        },
        {
          S_No: '2',
          Date: '13-12-2019',
          Invoice_No: '2222245',
          Price: '800',
          Commission: '10%',
          Commission_Amount: '80',
          Income_Amount: '720'
        },
        {
          S_No: '3',
          Date: '17-12-2019',
          Invoice_No: '2222245',
          Price: '2000',
          Commission: '10%',
          Commission_Amount: '200',
          Income_Amount: '1800'
        },
        {
          S_No: '4',
          Date: '11-12-2019',
          Invoice_No: '2222245',
          Price: '1500',
          Commission: '10%',
          Commission_Amount: '150',
          Income_Amount: '1350'
        }
      ]
    }
  },
  computed: {
    rowss() {
      return this.itens.length
    },
    itemss() {
      return this.$store.state.Accounts
    }
  },
  // beforeCreate() {
  //   this.$$store.dispatch('get_all_account')
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

      this.$router.push({
        path: '/vendor/invoice'
      })
      // this.$refs['my-modal'].show()
      // this.$refs['my-modal'].hide();
    }
    // VAction(id, ty) {
    //   consola.success(id, ty)
    // }
  }
}
</script>
