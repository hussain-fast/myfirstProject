<template>
  <div class="container mt-5 mb-5" style="width: 500px">
    <p>This is a test Paragraph</p>
    <vehicleInfo2 />
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
