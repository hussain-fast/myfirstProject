<template>
  <nav id="sidebar" v-bind:class="{ active: isOpen }">
    <div class="sidebar-header">
      <h3>Roadioapp</h3>
      <!-- <toggle-button />
      <div class="alert alert-primary" role="alert">
        This is a primary alert—check it out!
      </div> -->
    </div>
    <ul class="list-unstyled components">
      <!-- <li>
        <nuxt-link to="/vendor">Dashboard</nuxt-link>
      </li> -->
      <li>
        <nuxt-link to="/vendor/vehicles">Manage Vehicles</nuxt-link>
        <!-- <a href="/vendor/vehicles">Manage Vehicles</a> -->
      </li>
      <li>
        <nuxt-link to="/vendor/drivers">Manage Drivers</nuxt-link>
      </li>

      <li>
        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Jobs</a>
        <ul class="collapse list-unstyled" id="homeSubmenu">
          <li>
            <nuxt-link to="/vendor/newJobs">New Jobs</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/vendor/allJobs">All Jobs</nuxt-link>
          </li>
        </ul>
      </li>
      <li>
        <nuxt-link to="/vendor/accounts">Accounts</nuxt-link>
      </li>
      <!-- <a href="#">Drivers</a>
      </li>
       <li>
        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
        <ul class="collapse list-unstyled" id="pageSubmenu">
          <li>
            <a href="#">Page 1</a>
          </li>
          <li>
            <a href="#">Page 2</a>
          </li>
          <li>
            <a href="#">Page 3</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#">Portfolio</a>
      </li>
      <li>
        <a href="#">Contact</a>
      </li>-->
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    isOpen() {
      return this.$store.state.sidebar
    }
  }
}
</script>
<style scoped>
#sidebar {
  background-color: #333;
  min-width: 200px;
  max-width: 250px;
  min-height: 100vh;
}

#sidebar.active {
  margin-left: -250px;
}

a[data-toggle='collapse'] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
  }
  #sidebar.active {
    margin-left: 0;
  }
}

p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #fff;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar {
  /* don't forget to add all the previously mentioned styles here too */
  background: #333;
  color: #fff;
  transition: all 0.3s;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #333;
}

#sidebar ul.components {
  padding: 10px 0;
  border-bottom: 1px solid #47748b;
}

#sidebar ul p {
  color: #fff;
  padding: 5px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 0.9em;
  display: block;
}
#sidebar ul li a:hover {
  color: #7386d5;
  background: #fff;
}

#sidebar ul li.active > a,
a[aria-expanded='true'] {
  color: #fff;
  background: #6d7fcc;
}
ul ul a {
  font-size: 0.9em !important;
  padding-left: 40px !important;
  background: #333;
}
</style>
