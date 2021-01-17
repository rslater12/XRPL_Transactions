
// run checkObject, get Ledger index and add this to checkID

const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'});
const address = ""
const secret = ""

let tx_hash = "";
var CheckID = "724023129C51BE398E1F22CDE149452DA14C3B20B264D8FCE934F7928FC4E7D3"; // if checkid is unknown then use ledger index from ckeckObject.js.
var signed;

function createCheck(){
	
	api.connect().then(() => {
	  console.log('Connected')

	  const options = {
	    "maxLedgerVersionOffset": 60
    }
	  return api.prepareCheckCancel(address, {
        "checkID": CheckID
      }, options)

	}).then(prepared => {
	  console.log("txJSON:", prepared.txJSON);

		const txJSON = prepared.txJSON;
			
			 signed = api.sign(txJSON, secret)

			console.log("tx_blob is:", signed.signedTransaction)
			console.log("tx hash is:", signed.id)
	 const tx_blob = signed.signedTransaction;
	 tx_hash = signed.id

			 return api.submit(tx_blob)
	}).then(response => {
	  console.log("Preliminary transaction result:", response.resultCode)

	// Disconnect
	}).catch(console.error)
	setTimeout(confirm, 7000)
}
	createCheck()
	
	
async function confirm(){
	
  console.log('Connected')

 
  return api.getTransaction(tx_hash).then(response => {
			
		  console.log("Final Deleted Transaction Result:", response)

		}).then(() => {
            //exit
  api.disconnect().then(() => {
    console.log('Disconnected')
    process.exit()
  })
}).catch(console.error)
	
}
