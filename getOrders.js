
const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://rippled-dev.xrpayments.co'}); // testnet

//gets orders for an account

const Address = ''; //sender/source address
api.connect().then(() => {
  console.log('Connected')

  const account_offers_response = {
    command: "account_offers",
    account: Address,
    ledger_index: "validated",
    limit: 20
   
  }
  return api.connection.request(account_offers_response)
}).then(response => {
    //xrpl response
 console.log("account_objects response:", response)

}).then(() => {
    //exit
  api.disconnect().then(() => {
    console.log('Disconnected')
    process.exit()
  })
}).catch(console.error)