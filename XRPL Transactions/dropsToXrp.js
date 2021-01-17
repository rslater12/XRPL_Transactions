const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'});

const dropstoXRP = api.dropsToXrp('1000000');
const test = dropstoXRP
console.log(test)