//Search for checks by account sender.
const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'}); //Live NEt
const Address = ""

api.connect().then(() => {
    console.log('Connected')
  
    const account_objects_request = {
      command: "account_objects",
      account: Address,
      ledger_index: "validated",
      type: "check"
    }
    return api.connection.request(account_objects_request)
  }).then(response => { 
      //xrpl response
    console.log("account_objects response:", response)
    account_objects_response = response
    
    for (i=0; i < account_objects_response.account_objects.length; i++) {
      check_object = account_objects_response.account_objects[i]
      if (check_object.Account == Address) {
        console.log("Check From Sender:", check_object)
        console.log("Check Index, Insert to check ID in delete.js", check_object.index)
      }
    }
  
  }).then(() => {
      //exit
    api.disconnect().then(() => {
      console.log('Disconnected')
      process.exit()
    })
  }).catch(console.error)