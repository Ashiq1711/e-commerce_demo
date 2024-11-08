import express from 'express'
import SSLCommerzPayment from 'sslcommerz-lts'
const paymentRoute=express.Router()
// const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'orebi66e2916312360'
const store_passwd = 'orebi66e2916312360@ssl'
const is_live = false //true for live, false for sandbox


paymentRoute.get('/init', (req, res) => {

    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        const getPageUid= GatewayPageURL.split("/")
        const id =getPageUid[getPageUid.length - 1]
        res.status(200).send(id)
        console.log('Redirecting to: ', id)
    });
})

export default paymentRoute