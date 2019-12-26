<template>
  <div class="container mt-5 mb-5" style="width: 500px">
    <vehicleInfo2 />
    <p>Para for new branch</p>
  </div>
</template>
<script>
import vehicleInfo2 from './../../../components/manage_vecles/addVehicleForm'
export default {
  name: 'Vendor',
  layout: 'vendor',
  meta: { type: 'vendor' },
  components: {
    vehicleInfo2
  }
}
</script>
