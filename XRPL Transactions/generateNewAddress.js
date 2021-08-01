const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'});

console.log(api.generateAddress())