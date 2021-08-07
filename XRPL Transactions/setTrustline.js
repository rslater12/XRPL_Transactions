const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://testnet.xrpl-labs.com'}); // testnet

const Address = ''; //sender/source address
const secret = ''; // secret key


async function setTrustline() {

var issuer = "";
var cur = "";

const trust = {
    "limit": "10000000",
        "currency": cur,
        "counterparty": issuer,
        "ripplingDisabled": true
}

	api.connect().then(() => {
	  console.log('Connected...');
	  return api.prepareTrustline(Address, trust).then(prepared => {
	    console.log('Payment transaction prepared...');
	    const {signedTransaction} = api.sign(prepared.txJSON, secret);
	    console.log('Payment transaction signed...');
	    api.submit(signedTransaction).then(quit, fail);
	  });
	}).catch(fail);
}
 
setTrustline()

function quit(message) {
    console.log(message);
    process.exit(0);
  }

  function fail(message) {
    console.error(message);
    process.exit(1);
  }


