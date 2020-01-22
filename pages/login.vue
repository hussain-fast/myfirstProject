<template>
  <div class="card card-login mx-auto text-center bg-dark">
    <div class="card-header mx-auto bg-dark">
      <span>
        <!--  <img src="" class="w-75" alt="Logo" />-->
      </span>
      <br />
      <span class="logo_title mt-5">Login</span>
    </div>
    <div class="card-body">
      <form @submit.prevent="Login" action method="post">
        <div class="input-group form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <fa :icon="['fas', 'user']" />
            </span>
          </div>
          <input
            @keyup.enter="Login"
            v-model.trim="$v.email.$model"
            :class="{
              'is-invalid': $v.email.$error
            }"
            name="email"
            type="text"
            class="form-control"
            placeholder="Email"
          />
          <div class="invalid-feedback">
            <span v-if="!$v.email.required">Email is required</span>
          </div>
        </div>

        <div class="input-group form-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <fa :icon="['fas', 'key']" />
            </span>
          </div>
          <input
            @keyup.enter="Login"
            v-model.trim="$v.password.$model"
            :class="{
              'is-invalid': $v.password.$error
            }"
            name="password"
            type="password"
            class="form-control"
            placeholder="Password"
          />
          <div class="invalid-feedback">
            <span v-if="!$v.password.required">Password is required</span>
          </div>
        </div>
        <p style="color:red">{{ this.submitstatus }}</p>

        <div class="form-group">
          <input @click="Login" type="button" name="btn" value="Login" class="btn btn-outline-danger float-right" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import consola from 'consola'
import { required, numeric, url } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  layout: 'login',
  meta: { type: 'login' },
  data() {
    return {
      email: '',
      password: '',
      submitstatus: ''
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    Login(p) {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitstatus = 'Invalid Data'
      } else {
      }
      const { email, password, $store: store } = this
      store
        .dispatch('signIn', { email, password, type: 'vendor' })
        .then(() => {})
        .catch((e) => {
          consola.error(e)
        })
    }
  }
}
// npm install @fortawesome/fontawesome-svg-core   @fortawesome/free-brands-svg-icons   @fortawesome/free-solid-svg-icons   @fortawesome/vue-fontawesome nuxt-fontawesome --save
</script>

<style scoped>
body {
  background: #000 !important;
}
.card {
  border: 1px solid #28a745;
}
.card-login {
  margin-top: 130px;
  margin-left: 500px !important;
  padding: 18px;
  max-width: 30rem;
}

.card-header {
  color: #fff;
  /*background: #ff0000;*/
  font-family: sans-serif;
  font-size: 20px;
  font-weight: 600 !important;
  margin-top: 10px;
  border-bottom: 0;
}

.input-group-prepend span {
  background-color: #ff0000;
  color: #fff;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.login_btn {
  width: 130px;
}

.login_btn:hover {
  color: #fff;
  background-color: #ff0000;
}

.btn-outline-danger {
  color: #fff;
  font-size: 18px;
  background-color: #28a745;
  background-image: none;
  border-color: #28a745;
}

.form-control {
  color: #28a745;
  background-color: transparent;
  background-clip: padding-box;
  border: 1px solid #28a745;
  border-radius: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.input-group-text {
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0;
}
</style>
