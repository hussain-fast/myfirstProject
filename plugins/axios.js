import { auth, DB } from '~/plugins/firebase.js'
export default function({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    const { token } = store.state
    if (token) config.headers.common.Authorization = `Bearer ${token}`

    console.log('Request:')
    console.log(config)
  })

  $axios.onResponse((response) => {
    console.log('Response:')
    console.log(response)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)

    if (code === 400) {
      redirect('/400')
    }
  })
}
