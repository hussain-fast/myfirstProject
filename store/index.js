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
      waliVehicles: [],
      VendorDrivers: [],
      DriverPerDayLogs: [],
      DriverAllLogs: [],
      DriversWallets: [],
      NewJobs: [],
      AllJobs: [],
      DriverJobs: [],
      Accounts: [],
      VechilesList: {}, // for State
      VendorLiveVehicles: [], // this is for fetching vendors live vehicle list for pending requets
      VendorDriversList: {}, // it is for make vehicle live popup
      VendorLiveDriversList: {},
      MyLiveVehicles: {},
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
      setVendorLiveVehicles: (state, payload) => (state.VendorLiveVehicles = payload), // For Saving in state
      setVendorDriversList: (state, payload) => (state.VendorDriversList = payload), // For Showing in make vehicle live popup
      setVendorLiveDriversList: (state, payload) => (state.VendorLiveDriversList = payload), // For Showing in make vehicle live popup
      setMyLiveVehicles: (state, payload) => (state.MyLiveVehicles = payload), // For Showing in make vehicle live popup
      setHeavyVechiles: (state, payload) => (state.HeavyVechiles = payload),
      setVendorDrivers: (state, payload) => (state.VendorDrivers = payload),
      setDriverPerDayLogs: (state, payload) => (state.DriverPerDayLogs = payload),
      setDriverAllLogs: (state, payload) => (state.DriverAllLogs = payload),
      setDriversWallets: (state, payload) => (state.DriversWallets = payload),
      setNewJobs: (state, payload) => (state.NewJobs = payload),
      setAllJobs: (state, payload) => (state.AllJobs = payload),
      setDriverJobs: (state, payload) => (state.DriverJobs = payload),
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
      // this fetches driver list of vendor for make live pop up, minhaj will provide the condtion to fetch right list of drivres
      get_VendorLiveDriversList({ commit, state }) {
        DB.ref('heavyVehicles')
          .orderByChild('vendorId')
          .equalTo(state.user.uid)
          .once('value')
          .then((snap) => commit('setVendorLiveDriversList', snap.val()))
      },
      get_MyLiveVehicles({ commit, state }) {
        DB.ref('heavyVehicles')
          .orderByChild('vendorId')
          .equalTo(state.user.uid)
          .once('value')
          .then((snap) => {
            const payload = {}

            snap.forEach((ele) => {
              // console.log(ele.val().availability)
              if (ele.val().availability === true) {
                console.log(ele.val().availabilityInfo)
                payload.push({
                  ID: ele.key,
                  Status: ele.val().availability,
                  Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
                  Vehicle_Name: ele.val().name,
                  Vehicle_Number: ele.val().v_number,
                  availability: ele.val().availability,
                  vehicleId: ele.val().vehicleId,
                  vendorId: ele.val().vendorId
                  // Origin: ele.val().availabilityInfo.origin,
                  // Destination: ele.val().availabilityInfo.destination,
                  // Driver_Name: ele.val().driverId,
                  // Price: ele.val().availabilityInfo.price,
                  // Commission_Price: ele.val().availabilityInfo.comission
                })
              } else {
                consola.success('no data found')
              }
            })

            commit('setMyLiveVehicles', payload)
          })
      },
      get_VendorVehiclesList({ commit, state }) {
        DB.ref('heavyVehicles')
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
        // alert(data)
        return new Promise((resolve, reject) => {
          this.$axios
            .post('https://localhost:4443/test/add_vendor_driver', data)
            .then(({ data }) => {
              consola.success(data)
            })
            .catch(reject)
        })
      },
      edit_vendor_driver({ commit }, data) {
        alert(data)
        return new Promise((resolve, reject) => {
          this.$axios
            .post('https://localhost:4443/test/update_vendor_driver', data)
            .then(({ data }) => {
              consola.success(data)
            })
            .catch(reject)
        })
      },
      make_vehicle_live({ commit }, data) {
        // alert(data)
        return new Promise((resolve, reject) => {
          this.$axios
            .post('https://localhost:4443/test/change_vendor_vehicle_availability', data)
            .then(({ data }) => {
              consola.success(data)
            })
            .catch(reject)
        })
      },
      make_vehicle_offline({ commit }, data) {
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
      allot_heavy_vehicle_to_pending_request({ commit }, data) {
        alert(data)
        return new Promise((resolve, reject) => {
          this.$axios
            .post('https://localhost:4443/test/allot_vehicle_by_vendor_heavy_vehicle_req', data)
            .then(({ data }) => {
              consola.success(data)
            })
            .catch(reject)
        })
      },
      accept_heavy_vehicle_request({ commit }, data) {
        alert(data)
        return new Promise((resolve, reject) => {
          this.$axios
            .post('https://localhost:4443/test/accept_by_vendor_heavy_vehicle_req', data)
            .then(({ data }) => {
              consola.success(data)
            })
            .catch(reject)
        })
      },
      complete_heavy_vehicle_request({ commit }, data) {
        alert(data)
        return new Promise((resolve, reject) => {
          this.$axios
            .post('https://localhost:4443/test/complete_heavy_vehicle_req', data)
            .then(({ data }) => {
              consola.success(data)
            })
            .catch(reject)
        })
      },
      add_vehicle(
        { commit },
        // eslint-disable-next-line camelcase
        { vehicleId, name, v_number, v_model, v_make, uid }
      ) {
        return new Promise((resolve, reject) => {
          this.$axios.post('https://localhost:4443/test/add_vendor_vehicle', {
            vehicleId,
            name,
            v_number,
            v_model,
            v_make,
            uid
          })
        })
      },
      edit_vendor_vehicle(
        { commit },
        // eslint-disable-next-line camelcase
        { vehicleId, name, v_number, v_model, v_make, uid, availability }
      ) {
        return new Promise((resolve, reject) => {
          this.$axios.post('https://localhost:4443/test/update_vendor_vehicle', {
            vehicleId,
            name,
            v_number,
            v_model,
            v_make,
            uid,
            availability
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
              if (ele.val().availabilityInfo) {
                DB.ref('users')
                  .child(ele.val().driverId)
                  .once('value')
                  .then((userSnap) => {
                    payload.push({
                      ID: ele.key,
                      Status: ele.val().availability,
                      Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
                      Vehicle_Name: ele.val().name,
                      Vehicle_Number: ele.val().v_number,
                      availability: ele.val().availability,
                      vehicleId: ele.val().vehicleId,
                      vendorId: ele.val().vendorId,
                      Origin: ele.val().availabilityInfo.origin,
                      Destination: ele.val().availabilityInfo.destination,
                      Driver_Name: userSnap.child('first_name').val() + ' ' + userSnap.child('last_name').val(),
                      Price: ele.val().availabilityInfo.price,
                      Commission_Price: ele.val().availabilityInfo.comission
                    })
                  })
              } else {
                payload.push({
                  ID: ele.key,
                  Status: ele.val().availability,
                  Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
                  Vehicle_Name: ele.val().name,
                  Vehicle_Number: ele.val().v_number,
                  availability: ele.val().availability,
                  vehicleId: ele.val().vehicleId,
                  vendorId: ele.val().vendorId
                })
              }
            })

            commit('setHeavyVechiles', payload)
          })
      },
      get_vendorLiveVehicles({ commit, state }) {
        DB.ref('heavyVehicles')
          .orderByChild('vendorId')
          .equalTo(state.user.uid)
          .once('value')
          .then((snap) => {
            const payload = []

            snap.forEach((ele) => {
              // console.log(ele.val().availability)
              if (ele.val().availability === true) {
                console.log(ele.val().availabilityInfo)
                // payload.push({
                //   ID: ele.key,
                //   Status: ele.val().availability,
                //   Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
                //   Vehicle_Name: ele.val().name,
                //   Vehicle_Number: ele.val().v_number,
                //   availability: ele.val().availability,
                //   vehicleId: ele.val().vehicleId,
                //   vendorId: ele.val().vendorId
                //   // Origin: ele.val().availabilityInfo.origin,
                //   // Destination: ele.val().availabilityInfo.destination,
                //   // Driver_Name: ele.val().driverId,
                //   // Price: ele.val().availabilityInfo.price,
                //   // Commission_Price: ele.val().availabilityInfo.comission
                // })
              } else {
                consola.success('no data found')
              }
            })

            commit('setVendorLiveVehicles', payload)
          })
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
                Driver_Name: ele.val().first_name + ' ' + ele.val().last_name,
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
      get_driver_per_day_logs({ commit, state }) {
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

            commit('setDriverPerDayLogs', payload)
          })
      },
      get_driver_all_logs({ commit, state }) {
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

            commit('setDriverAllLogs', payload)
          })
      },
      get_driver_wallets({ commit, state }) {
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

            commit('setDriversWallets', payload)
          })
      },
      get_all_jobs({ commit, state }) {
        DB.ref('requests/heavyVehicles')
          .orderByChild('vendorId')
          .equalTo(state.user.uid)
          .once('value')
          .then((snap) => {
            const payload = []

            snap.forEach((ele) => {
              // consola.success(ele.val())
              if (ele.val().status === 'complete' || ele.val().status === 'cancel') {
                console.log('hII')
                DB.ref('users')
                  .child(ele.val().clientId)
                  .once('value')
                  .then((userSnap) => {
                    payload.push({
                      ID: ele.key,
                      Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
                      Client_Name: userSnap.child('first_name').val() + ' ' + userSnap.child('last_name').val(),
                      Request_Date: ele.val().requDate,
                      Origin: ele.val().orgText,
                      Destination: ele.val().desText,
                      // Is_Hire: ele.val().isHire,
                      Vehicle_Number: ele.val().vehicleId,
                      Price: ele.val().price,
                      Commission: ele.val().comission,
                      Status: ele.val().status
                    })
                  })
              }
            })

            commit('setAllJobs', payload)
          })
      },
      get_driver_jobs({ commit, state }) {
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

            commit('setDriverJobs', payload)
          })
      },
      get_new_jobs({ commit, state }) {
        DB.ref('requests/heavyVehicles')
          .orderByChild('vendorId')
          .equalTo(state.user.uid)
          .once('value')
          .then((snap) => {
            const payload = []
            snap.forEach((ele) => {
              consola.success(ele.val())
              // switch (ele.status) {
              //   case 'pending':
              //   case 'accept':
              //   case 'allot': {
              if (ele.val().status === 'pending' || ele.val().status === 'accept' || ele.val().status === 'allot') {
                DB.ref('users')
                  .child(ele.val().clientId)
                  .once('value')
                  .then((userSnap) => {
                    console.log(ele.val())
                    payload.push({
                      ID: ele.key,
                      vendorId: state.user.uid,
                      Created_At: moment(ele.val().createdAt).format('MM-DD-YYYY'),
                      accept_time: moment(ele.val().accept_time).format('MM-DD-YYYY'),
                      allot_time: moment(ele.val().allot_time).format('MM-DD-YYYY'),
                      completedAt: moment(ele.val().completedAt).format('MM-DD-YYYY'),
                      Client_Name: userSnap.child('first_name').val() + ' ' + userSnap.child('last_name').val(),
                      Client_No: userSnap.child('mob_no').val(),
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
              }
              //   }
              // }
            })

            commit('setNewJobs', payload)
          })
      },
      get_all_account({ commit, state }) {
        DB.ref('requests/heavyVehicles')
          .orderByChild('driverId')
          .equalTo(state.user.uid)
          .once('value')
          .then((snap) => {
            const payload = []

            snap.forEach((ele) => {
              consola.success(ele.val())

              payload.push({
                ID: ele.key,
                Date: moment(ele.val().createdAt).format('MM-DD-YYYY'),
                Invoice_No: ele.val().clientId,
                Price: ele.val().price,
                Commission: ele.val().comission,
                Commission_Amount: ele.val().comission,
                Income_Amount: ele.val().price,
                status: ele.val().status
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
                  else commit('setAuthType', 'vendor')
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
              if (users.exists()) {
                auth
                  .signInWithEmailAndPassword(email, password)
                  .then((user) => {
                    consola.info(user)
                    this.$router.push({
                      path: '/vendor/'
                    })
                    resolve(user)
                  })
                  .catch((e) => {
                    auth
                      .createUserWithEmailAndPassword(email, password)
                      .then((user) => {
                        consola.info(user)
                        this.$router.push({
                          path: '/vendor/'
                        })
                        resolve(user)
                      })
                      .catch((e) => consola.error(e))
                  })
                users.forEach((element) => {
                  if (element.child('type').val() === 'vendor') {
                  } else {
                    return 'vendor not exist'
                  }
                })
              } else {
                return 'data not exist'
              }
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
