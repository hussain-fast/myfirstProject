import Vuex from 'vuex'
import consola from 'consola'
import moment from 'moment'
import { auth, DB } from '~/plugins/firebase.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      errorMessage: '',
      token: null,
      auth: false,
      authType: null,
      sidebar: false,
      MyVechiles: [],
      HeavyVechiles: [],
      VendorDrivers: [],
      NewJobs: [],
      AllJobs: [],
      Accounts: [],
      VechilesList: {}, // for State
      VendorDriversList: {}, // it is for make vehicle live popup
      adda_list: []
    },
    getters: {
      GetUser: (state, getters) => state.user,
      getToken: (state, getters) => state.token,
      getAuth: (state, getters) => state.auth,
      getAuthType: (state, getters) => state.authType
    },
    mutations: {
      setAddaList: (state, payload) => (state.adda_list = payload),
      setVechilesList: (state, payload) => (state.VechilesList = payload), // For Saving in state
      setVendorDriversList: (state, payload) => (state.VendorDriversList = payload), // For Showing in make vehicle live popup
      setHeavyVechiles: (state, payload) => (state.HeavyVechiles = payload),
      setVendorDrivers: (state, payload) => (state.VendorDrivers = payload),
      setNewJobs: (state, payload) => (state.NewJobs = payload),
      setAllJobs: (state, payload) => (state.AllJobs = payload),
      setAccounts: (state, payload) => (state.Accounts = payload),
      setVendorVehicles: (state, payload) => (state.setVendorVehicles = payload),
      setMyVechiles: (state, payload) => (state.MyVechiles = payload),
      setErrorMessage: (state, payload) => (state.errorMessage = payload),
      setToggleSidebar: (state) => (state.sidebar = !state.sidebar),
      setUser: (state, payload) => {
        state.user = payload
        state.auth = !!payload
      },
      setToken: (state, payload) => (state.token = payload),
      setAuthType: (state, payload) => (state.authType = payload)
    },
    actions: {
      // action for getting data from firebase and saving by commit mutations
      get_VechilesList({ commit }) {
        DB.ref('admin/heavy_vehicles_list')
          .once('value')
          .then((snap) => commit('setVechilesList', snap.val()))
      },
      // this fetches driver list of vendor for make live pop up, minhaj will provide the condtion to fetch right list of drivres
      get_VendorDriversList({ commit, state }) {
        DB.ref('users')
          .orderByChild('vendorId')
          .equalTo(state.user.uid)
          .once('value')
          .then((snap) => commit('setVendorDriversList', snap.val()))
      },
      get_adda_list({ commit }) {
        return new Promise((resolve, reject) => {
          this.$axios.get('https://localhost:4443/test/adda_list').then((payload) => {
            commit('setAddaList', payload.data)
          })
        })
      },
      add_driver({ commit }, data) {
        alert(data)
        return new Promise((resolve, reject) => {
          this.$axios
            .post('https://localhost:4443/test/add_vendor_driver', data)
            .then(({ data }) => {
              consola.success(data)
            })
            .catch(reject)
        })
      },
      make_vehicle_live({ commit }, data) {
        alert(data)
        return new Promise((resolve, reject) => {
          this.$axios
            .post('https://localhost:4443/test/change_vendor_vehicle_availability', data)
            .then(({ data }) => {
              consola.success(data)
            })
            .catch(reject)
        })
      },
      add_vehicle(
        { commit },
        // eslint-disable-next-line camelcase
        { vehicleId, name, v_number, v_model, v_make }
      ) {
        return new Promise((resolve, reject) => {
          this.$axios.post('https://localhost:4443/test/add_vendor_vehicle', {
            vehicleId,
            name,
            v_number,
            v_model,
            v_make
          })
        })
      },
      get_my_vehicles({ commit, state }) {
        DB.ref('heavyVehicles')
          .orderByChild('vendorId')
          .equalTo(state.user.uid)
          .once('value')
          .then((snap) => {
            const payload = []

            snap.forEach((ele) => {
              consola.success(ele.val())

              payload.push({
                ID: ele.key,
                Status: ele.val().availability,

                Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
                Vehicle_Name: ele.val().name,
                Vehicle_Number: ele.val().v_number,
                availability: ele.val().availability

                // Origin: ""
                // Destination: ""
                // Driver_Name: ""
                // Driver_CNIC: ""
                // Driver_LicenseNo: ""
                // Driver_Phone: ""
                // Price: ""
                // Commission_Price: ""
              })

              // updatedAt: 1576142641943
              // v_make: '5489'
              // v_year: '89784'
              // vehicleId: 'honda_traller'
              // vendorId: '-LtxgnFM8NzuMXKWDzGC'
            })

            commit('setHeavyVechiles', payload)
          })

        // this.$axios
        //   .get('https://localhost:4443/test/heavy_vehicles')
        //   .then(({ data }) => {
        //     consola.success(data.data)
        //     const payload = []
        //     for (const property in data.data) {
        //       if (data.data.hasOwnProperty(property)) {
        //         const obj = {}

        //         obj.value = property
        //         obj.text = data.data[property].name
        //         obj.disabled = !data.data[property].status
        //         payload.push(obj)
        //       }
        //     }
        //   })
        //   .catch(consola.error)

        // this.$axios
        //   .get('https://localhost:4443/test/get_vendor_vehicles')
        //   .then(({ data }) => {
        //     const payload = []
        //     for (const property in data.data) {
        //       if (data.data.hasOwnProperty(property)) {
        //         const obj = {}
        //         obj.ID = property
        //         consola.success(data.data[property].createdAt)
        //         obj.Created_At = moment(data.data[property].createdAt).format('DD-MM-YYYY')
        //         obj.Vehicle_Name = data.data[property].name
        //         obj.Vehicle_Number = data.data[property].v_number
        //         obj.Origin = data.data[property].availabilityInfo ? data.data[property].availabilityInfo.origin : ''
        //         obj.Destination = data.data[property].availabilityInfo ? data.data[property].availabilityInfo.destination : ''
        //         obj.Driver_Name = data.data[property].availabilityInfo
        //           ? data.data[property].availabilityInfo.driverInfo
        //             ? data.data[property].availabilityInfo.driverInfo.name
        //             : ''
        //           : ''
        //         obj.Driver_CNIC = data.data[property].availabilityInfo
        //           ? data.data[property].availabilityInfo.driverInfo
        //             ? data.data[property].availabilityInfo.driverInfo.cnic
        //             : ''
        //           : ''
        //         obj.Driver_LicenseNo = data.data[property].availabilityInfo
        //           ? data.data[property].availabilityInfo.driverInfo
        //             ? data.data[property].availabilityInfo.driverInfo.licenseNo
        //             : ''
        //           : ''
        //         obj.Driver_Phone = data.data[property].availabilityInfo
        //           ? data.data[property].availabilityInfo.driverInfo
        //             ? data.data[property].availabilityInfo.driverInfo.phone
        //             : ''
        //           : ''

        //         obj.Price = data.data[property].availabilityInfo ? data.data[property].availabilityInfo.price : ''
        //         obj.Commission_Price = data.data[property].availabilityInfo ? data.data[property].availabilityInfo.comission : ''
        //         obj.Status = data.data[property].status

        //         payload.push(obj)
        //       }
        //     }
        //     consola.success(payload)
        //     commit('setMyVechiles', payload)
        //   })
        //   .catch(consola.error)
      },
      get_my_drivers({ commit, state }) {
        DB.ref('users')
          .orderByChild('vendorId')
          .equalTo(state.user.uid)
          .once('value')
          .then((snap) => {
            const payload = []

            snap.forEach((ele) => {
              consola.success(ele.val())

              payload.push({
                ID: ele.key,
                Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
                Vendor_Id: ele.val().vendorId,
                Adda_Ref: ele.val().adda_ref,
                Blocked: ele.val().blocked,
                CNIC_NO: ele.val().cnic_no,
                Driving_License: ele.val().driving_license,
                Email: ele.val().email,
                Driver_Name: ele.val().first_name,
                Mobile_No: ele.val().mob_no,
                Offline: ele.val().offline,
                Password: ele.val().password,
                Status: ele.val().status,
                Vehicle_Type: ele.val().vehicle
              })
            })

            commit('setVendorDrivers', payload)
          })
      },
      get_all_jobs({ commit, state }) {
        DB.ref('users')
          .orderByChild('vendorId')
          .equalTo(state.user.uid)
          .once('value')
          .then((snap) => {
            const payload = []

            snap.forEach((ele) => {
              consola.success(ele.val())

              payload.push({
                ID: ele.key,
                Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
                Vendor_Id: ele.val().vendorId,
                Adda_Ref: ele.val().adda_ref,
                Blocked: ele.val().blocked,
                CNIC_NO: ele.val().cnic_no,
                Driving_License: ele.val().driving_license,
                Email: ele.val().email,
                Driver_Name: ele.val().first_name,
                Mobile_No: ele.val().mob_no,
                Offline: ele.val().offline,
                Password: ele.val().password,
                Status: ele.val().status,
                Vehicle_Type: ele.val().vehicle
              })
            })

            commit('setAllJobs', payload)
          })
      },
      get_new_jobs({ commit, state }) {
        DB.ref('requests/heavyVehicles')
          .where('status', '!==', 'cancel')
          .once('value')
          .then((snap) => {
            const payload = []

            snap.forEach((ele) => {
              consola.success(ele.val())

              payload.push({
                ID: ele.key,
                Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
                Client_Id: ele.val().Client_Id,
                Request_Date: ele.val().requDate,
                Origin: ele.val().orgText,
                Destination: ele.val().desText,
                Is_Hire: ele.val().isHire,
                Vehicle_Id: ele.val().vehicleId,
                Price: ele.val().price,
                Commission: ele.val().comission,
                Status: ele.val().status
              })
            })

            commit('setNewJobs', payload)
          })
      },
      get_all_account({ commit, state }) {
        DB.ref('users')
          .orderByChild('vendorId')
          .equalTo(state.user.uid)
          .once('value')
          .then((snap) => {
            const payload = []

            snap.forEach((ele) => {
              consola.success(ele.val())

              payload.push({
                ID: ele.key,
                Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
                Vendor_Id: ele.val().vendorId,
                Adda_Ref: ele.val().adda_ref,
                Blocked: ele.val().blocked,
                CNIC_NO: ele.val().cnic_no,
                Driving_License: ele.val().driving_license,
                Email: ele.val().email,
                Driver_Name: ele.val().first_name,
                Mobile_No: ele.val().mob_no,
                Offline: ele.val().offline,
                Password: ele.val().password,
                Status: ele.val().status,
                Vehicle_Type: ele.val().vehicle
              })
            })

            commit('setAllJobs', payload)
          })
      },
      nuxtClientInit({ commit }) {
        return new Promise((resolve, reject) => {
          consola.info('i Run Every Time')

          auth.onAuthStateChanged((user) => {
            if (user) {
              user
                .getIdToken()
                .then((token) => commit('setToken', token))
                .catch((e) => commit('setToken', null))
              commit('setUser', {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                phoneNumber: user.phoneNumber
              })
              DB.ref('users')
                .child(user.uid)
                .once('value')
                .then((snap) => {
                  if (snap.exists()) commit('setAuthType', snap.val().type)
                  else commit('setAuthType', 'admin')
                  resolve()
                })
                .catch((e) => consola.info(e))
            } else {
              commit('setUser', null)
              commit('setToken', null)
              resolve()
            }
          })
        })
      },
      signIn({ commit }, { email, password, type }) {
        return new Promise((resolve, reject) => {
          if (!email || !password || !type) return reject(new Error(`Give ${email ? (password ? 'type' : 'password') : 'email'} to Login`))
          DB.ref('users')
            .orderByChild('email')
            .equalTo(email)
            .once('value')
            .then((users) => {
              let isOk = false
              users.forEach((user) => (isOk = user.val().type === type ? true : isOk))

              if (isOk) {
                consola.info('asdasdas')
              }
            })
            .catch((e) => consola.error(e))
          auth
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
              consola.info(user)
              resolve(user)
            })
            .catch((e) => consola.error(e))
        })
      },
      ToggleSidebar({ commit }) {
        commit('setToggleSidebar')
      },
      signOut({ commit }) {
        return new Promise((resolve, reject) => {
          auth
            .signOut()
            .then(() => commit('setUser', null), commit('setToken', null), resolve())
            .catch((e) => reject(e))
        })
      }
    }
  })
}
export default createStore
