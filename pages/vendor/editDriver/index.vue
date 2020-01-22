<template>
  <div class="container mt-5 mb-5" style="width: 500px">
    <AddDriverForm />
  </div>
</template>
<script>
import AddDriverForm from './../../../components/add_driver/editDriverForm'
export default {
  name: 'Vendor',
  layout: 'vendor',
  meta: { type: 'vendor' },
  components: {
    AddDriverForm
  }
}
</script>
