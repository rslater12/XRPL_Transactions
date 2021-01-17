'use strict'
// Create Check
const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://xrpl.ws'}); //Live Net
const address = ""
const secret = ""
const deliveryAddress = "";
const decodeAddress = require('ripple-address-codec').decodeAddress;
const createHash = require('crypto').createHash;
let tx_hash = "";
var signed
var Note = "hi"
	  
const details = {
	"destination": deliveryAddress,
	    "sendMax": {
	      "currency": "XRP",
		  "value": "12" // RippleAPI uses decimal XRP, not integer drops
		
		},
		"memos": 
		{
		  "data": Note
		}
  };

	function createCheck(){
	
 //xrpl org method
api.connect().then(() => {
	  console.log('Connected')

	  const options = {
	    // Allow up to 60 ledger versions (~5 min) instead of the default 3 versions
	    // before this transaction fails permanently.
	    "maxLedgerVersionOffset": 60
	  }
	  return api.prepareCheckCreate(address, details, options)

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
	  console.log("Preliminary Create Check Transaction Result:", response.resultCode)

	// Disconnect
	}).catch(console.error)
	setTimeout(confirm, 7000)
}
	createCheck()
	
	
async function confirm(){
	
  console.log('Connected')

  return api.getTransaction(tx_hash).then(() => {
		
		
	return api.getTransaction(tx_hash)

		}).then(response => {
			
		  console.log("Final Create Check Transaction Result:", response)

		 
		  const checkIDhasher = createHash('sha512')
		  checkIDhasher.update(Buffer.from('0043', 'hex'))
		  checkIDhasher.update(new Buffer(decodeAddress(response.address)))
		  const seqBuf = Buffer.alloc(4)
		  seqBuf.writeUInt32BE(response.sequence, 0)
		  checkIDhasher.update(seqBuf)
		  const checkID = checkIDhasher.digest('hex').slice(0,64).toUpperCase()
		  console.log("Calculating checkID:", checkID)

		}).then(() => {
			//exit
  api.disconnect().then(() => {
    console.log('Disconnected')
    process.exit()
  })
}).catch(console.error)
	
}