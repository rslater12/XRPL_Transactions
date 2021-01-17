const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'}); // testnet

const Address = ''; //sender/source address
const secret = ''; // secret key

/*!!!!!!!!!!!!!!!!!!Not Tested!!!!!!!!!!!!!!!!!!!*/

async function createoffer(){

    const offercreate = {
        "direction": "sell",
        "quantity": {
          "currency": "USD",
          "counterparty": "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
          "value": "10.1"
        },
        "totalPrice": {
          "currency": "drops",
          "value": "2000000"
        },
        "passive": false,
        "fillOrKill": true
      };

api.connect().then(() => {
    console.log('Connected...');
    return api.prepareOrder(Address, offercreate).then(prepared => {
      console.log( "Offer Created", prepared );
       const {signedTransaction} = api.sign(prepared.txJSON, secret);
       console.log();
      console.log('Created');
          api.submit(signedTransaction).then(quit, fail);
           
    });
  }).catch(fail);

        }
        
        createoffer()

        function quit(message) {
            console.log(message);
            process.exit(0);
          }

          function fail(message) {
            console.error(message);
            process.exit(1);
          }
