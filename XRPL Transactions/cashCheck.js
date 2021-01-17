'use strict'
//Cash Check
const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://xrpl.ws'}); //Live Net
const address = "";
const secret = "";
const deliveryAddress = "";
var signed;

//cash check
function cashCheck(){
    //xrpl org method
   api.connect().then(() => {
         console.log('Connected')
         const options = {
               "maxLedgerVersionOffset": 60
             }
             return api.prepareCheckCash(deliveryAddress, {
               "checkID": "F715272142F6F28B3DABB6B0EDE4645392FA4B0E69A8AFEDB3091FF52A00FAD4",
               "amount": {
                 "currency": "XRP",
                 "value": "1" 
               }
             })

           }).then(prepared => {
             console.log("txJSON:", prepared.txJSON);

           const txJSON = prepared.txJSON;
               
                signed = api.sign(txJSON, secret)

               console.log("tx_blob is:", signed.signedTransaction)
               console.log("tx hash is:", signed.id)
        const tx_blob = signed.signedTransaction;

                return api.submit(tx_blob)
       }).then(response => {
         console.log("Preliminary Cash Check Transaction Result:", response.resultCode)

})
}

cashCheck()