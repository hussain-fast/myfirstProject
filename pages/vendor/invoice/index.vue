<template>
  <div>
    <section class="content-header">
      <h5>Invoice</h5>
      <!-- <b-breadcrumb :items="items" class="float-right"></b-breadcrumb> -->
    </section>
    <section class="content">
      <b-row>
        <b-col xl="12">
          <div style="padding:0;margin:0;" v-if="!dataLoad &amp;&amp; invData !== null">
            <table width="100%" style="background-color:#333333;color:whitesmoke;border-radius:5px;" cellpadding="20" cellspacing="0">
              <tbody>
                <tr>
                  <td height="50px" align="center">
                    <img
                      style="border-bottom:3px solid #fcd519;"
                      src="https://roadioapp.com:4443/images/roadio_logo_web.png"
                      width="200"
                      alt="Logo"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" align="center" cellspacing="0" style='font-family:"Helvetica","Arial",sans-serif;'>
                      <tbody>
                        <tr>
                          <td style="border-left: 3px solid #fcd519;padding-left: 10px;">
                            <h4>Invoice From:<br />RoadioApp</h4>
                            <a>roadioapppak@gmail.com</a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style="padding: 5px;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td style="border-left: 3px solid #fcd519;padding-left: 10px;">
                            <h4>Invoice To:<br />{{ 'farhan ahmed' }}</h4>
                            <a>{{ 'farhan@test.com' }}</a>
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td colspan="2" style="border-left: 3px solid #fcd519;padding-left: 10px;">
                            <h4>Date: {{ '06:42 PM 21/Dec/2018' }}</h4>
                            <h4>Invoice #: {{ '20181221U166' }}</h4>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style="padding: 5px;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td style="width:50%;vertical-align: top;float: right;margin-top: -248px;">
                            <table width="100%" align="center" border="0" style="border: 2px solid;">
                              <thead>
                                <tr>
                                  <th colspan="2" style="border: 2px solid;">
                                    <h4 style="margin: 0;padding: 10px;text-align: center;font-size: 27px;color: #fcd519;">Driver Details</h4>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">Name</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">
                                    {{ 'Sardar Munir' }}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">Email</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">{{ 'email@test.com' }}</td>
                                </tr>
                                <tr>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">Mobile No.</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">{{ '03023273270 ' }}</td>
                                </tr>
                                <tr>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">Vehicle</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">{{ 'Pickup' }}</td>
                                </tr>
                                <tr>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">Vehicle Number</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">{{ 'KC-0686' }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td style="width:40%;vertical-align: top;">
                            <table width="100%" align="center" border="0" style="border: 2px solid;margin-top: -248px;">
                              <thead>
                                <tr>
                                  <th colspan="2" style="border: 2px solid;">
                                    <h4 style="margin: 0;padding: 10px;text-align: center;font-size: 27px;color: #fcd519;">Request Details</h4>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">Created Request</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">{{ this.createdAt }}</td>
                                </tr>
                                <tr>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">Origin</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">
                                    {{ this.orgtext }}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">Destination</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">
                                    {{ this.desText }}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">Vehicle Required</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">{{ this.vecType }}</td>
                                </tr>
                                <tr>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">Est. Time</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">{{ '17 mins' }}</td>
                                </tr>
                                <tr>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">Est. Distance</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:left;">{{ '5.5 km' }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style="padding: 5px;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <table width="100%" align="center" border="0" style="border: 2px solid;">
                              <thead>
                                <tr>
                                  <th style="border: 2px solid;">
                                    <h4 style="margin: 0;padding: 10px;text-align: center;font-size: 27px;color: #fcd519;">Order Details</h4>
                                  </th>
                                  <th style="border: 2px solid;min-width: 150px;width: auto;">
                                    <h4 style="margin: 0;padding: 10px;text-align: center;font-size: 27px;color: #fcd519;">Amount</h4>
                                  </th>
                                  <th style="border: 2px solid;min-width: 150px;width: auto;">
                                    <h4 style="margin: 0;padding: 10px;text-align: center;font-size: 27px;color: #fcd519;">Discount</h4>
                                  </th>
                                  <th style="border: 2px solid;min-width: 150px;width: auto;">
                                    <h4 style="margin: 0;padding: 10px;text-align: center;font-size: 27px;color: #fcd519;">Payable</h4>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td style="border: 2px solid;padding: 5px;text-align:center;">
                                    From({{ 'origin' }}) To({{ 'destination' }}) User({{ 'userName' }}) Driver({{ 'driverName' }})
                                  </td>
                                  <td style="border: 2px solid;padding: 5px;text-align:center;">Rs.{{ this.price }}</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:center;">Rs.0</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:center;">Rs.{{ this.price }}</td>
                                  <!-- <td style="border: 2px solid;padding: 5px;text-align:center;">Rs.{{ 'invData.inv_data.amount' }}</td>
                                  <td style="border: 2px solid;padding: 5px;text-align:center;">Rs.{{ 'invData.inv_data.discountPrice' }}</td> -->
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style="padding: 10px;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td style="border-left: 3px solid #fcd519;padding-left: 10px;padding-bottom: 20px;">
                            <h4>Phone: 0303*******</h4>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style="padding: 5px;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td style="border-left: 0px solid #fcd519;padding-left: 9px;float: right;margin-right: 369px;margin-top: -40px;">
                            <h4>email:&nbsp;<a>roadioapppak@gmail.com</a></h4>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style="padding: 5px;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td style="border-left: 3px solid #fcd519;padding-left: 10px;float: right;margin-top: -54px;">
                            <h4>Website:&nbsp;<a>www.roadioapp.com</a></h4>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
    </section>
  </div>
</template>
<script>
import Vuex from 'vuex'
import consola from 'consola'
import moment from 'moment'
import { auth, DB } from '~/plugins/firebase.js'
export default {
  name: 'Vendor',
  layout: 'vendor',
  meta: { type: 'vendor' },
  data() {
    return {
      orgtext: '',
      createdAt: '',
      desText: '',
      price: '',
      comission: '',
      vecType: ''
    }
  },
  computed: {},
  beforeCreate() {
    DB.ref('requests/heavyVehicles')
      .child(this.$route.params.id)
      .once('value')
      .then((snap) => {
        console.log(snap.val())
        this.orgtext = snap.val().orgText
        this.createdAt = new Date(moment(snap.val().createdAt).format('DD MMM YYYY'))
        this.desText = snap.val().desText
        this.price = snap.val().price
        this.comission = snap.val().comission
        this.vecType = snap.val().vecType
      })
  },
  mounted() {},
  methods: {}
}
</script>
