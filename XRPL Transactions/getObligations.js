const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'}); // testnet

const Address = ''; //sender/source address
const secret = ''; // secret key

async function getObligations(){
	
	await api.connect()

	Obligations = await api.getTrustlines(Address).then(info => Obligations = info)
	.then(quit, fail);
	console.log(Obligations)
	}

getObligations()

function quit(message) {
    console.log(message);
    process.exit(0);
  }

  function fail(message) {
    console.error(message);
    process.exit(1);
  }