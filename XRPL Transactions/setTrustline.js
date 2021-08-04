const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'}); // testnet

const Address = ''; //sender/source address
const secret = ''; // secret key

/*!!!!!!!!!!!Not Tested!!!!!!!!!*/
async function setTrustline() {

var issuer = "";
var cur = "";

const trust = {
    
      "currency": cur,
      "counterparty": issuer,
      "limit": "100"
 
}

	api.connect().then(() => {
	  console.log('Connected...');
	  return api.prepareTrustline(Address, payment).then(prepared => {
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


