const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'}); // testnet

const Address = ''; //sender/source address
const secret = ''; // secret key

async function getSettings(){
	
await api.connect()

var test = await api.getSettings(Address).then(quit, fail);
console.log(test) 
/* requireDestinationTag = await api.getSettings(Address).then(info =>  requireDestinationTag = info.requireDestinationTag)
defaultRipple = await api.getSettings(Address).then(info =>  defaultRipple = info.defaultRipple)
transferRate = await api.getSettings(Address).then(info =>  transferRate = info.transferRate)
console.log(requireDestinationTag)
console.log(defaultRipple)
console.log(transferRate) */
	
}

getSettings()

function quit(message) {
    console.log(message);
    process.exit(0);
  }

  function fail(message) {
    console.error(message);
    process.exit(1);
  }