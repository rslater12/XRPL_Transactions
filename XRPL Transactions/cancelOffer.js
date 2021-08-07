const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://testnet.xrpl-labs.com'}); // testnet

const Address = ''; //sender/source address
const secret = ''; // secret key


const cancel = {
  "orderSequence": 18754188 // order sequence of the create sell/buy offer
};

api.connect().then(() => {
             console.log('Connected...');
             return api.prepareOrderCancellation(Address, cancel).then(prepared => {
               console.log( "Offer Created", prepared );
                const {signedTransaction} = api.sign(prepared.txJSON, secret);
                console.log();
               console.log('Created');
                   api.submit(signedTransaction).then(quit, fail);
                    
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
