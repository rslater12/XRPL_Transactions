const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'}); // testnet

const Address = ''; //Sender/Source/Issuer address
const secret = ''; //secret key

const DefaultRipple = {
"Account": Address,
      "Fee": "12000",
      "Flags": 0,
      "SetFlag": 8,
      "TransactionType": "AccountSet"
  };

  api.connect().then(() => {
    console.log('Connected...');
    return api.prepareTransaction(DefaultRipple).then(prepared => { //preparepayment needs to be chnaged
      console.log('Set Default Rippled prepared...');
      const {signedTransaction} = api.sign(prepared.txJSON, secret);
      console.log('Set Require Destination Tag signed...');
      api.submit(signedTransaction)
      .then(quit, fail);
    });
  }).catch(fail);


 function quit(message) {
            console.log(message);
            process.exit(0);
          }

          function fail(message) {
            console.error(message);
            process.exit(1);
          }

