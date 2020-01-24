<template>
  <div>
    <h5>vendor</h5>
    <b-row>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #00a65a !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Online Vehicles</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #0073b7 !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Total Active Users</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #f56954 !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Offline Vehicles</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #f39c12 !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Total Completed Jobs</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #222222 !important;  color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Total Cancelled Jobs</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #00a65a !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Total Active Drivers</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #f39c12 !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Total Inactive Drivers</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #00c0ef !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Total Mazda Registered</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #00a65a !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Registered Pickups</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #f56954 !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Total Active Users</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="small-box bg-green">
          <div
            class="inner text-center"
            style="background-color: #00a65a !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
          >
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Total Active Users</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #00a65a !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Total Active Users</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #00a65a !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Total Active Users</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div
          class="small-box bg-green"
          style="background-color: #00a65a !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
        >
          <div class="inner text-center">
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Total Active Users</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="small-box bg-green">
          <div
            class="inner text-center"
            style="background-color: #00a65a !important; color: white; padding-bottom:5px; padding-top:5px; margin-bottom:10px;"
          >
            <h3>
              <template v-if="true">{{ '20' }}</template>
            </h3>
            <p>Total Active Users</p>
          </div>
          <!-- <router-link
            class="small-box-footer"
            :to="{ path: '/admin/users', query: { Activeusers: 'Actived', FromDate: timestamp(FromDate), ToDate: timestamp(ToDate) } }"
            >More info&nbsp;<i class="fa fa-arrow-circle-right"></i
          ></router-link> -->
        </div>
      </div>
    </b-row>
  </div>
</template>
<script>
export default {
  name: 'Vendor',
  layout: 'vendor',
  meta: { type: 'vendor' }
}
</script>
