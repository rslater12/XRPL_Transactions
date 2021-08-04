const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://testnet.xrpl-labs.com'}); // testnet

const Address = ''; //sender/source address
const secret = ''; // secret key

async function buyoffer(){

    const buyoffer = {
                 "direction": "buy",
                 "quantity": {
                   "currency": "EUR",
                   "counterparty": "",
                   "value": "60"
                 },
                 "totalPrice": {
                   "currency": "XRP",
                   "value": "94"
                 },
                 //"passive": false,
                 "fillOrKill": false
               };
         
         api.connect().then(() => {
             console.log('Connected...');
             return api.prepareOrder(Address, buyoffer).then(prepared => {
               console.log( "Offer Created", prepared );
                const {signedTransaction} = api.sign(prepared.txJSON, secret);
                console.log();
               console.log('Created');
                   api.submit(signedTransaction).then(quit, fail);
                    
             });
     }).catch(fail);
         
 }
                 
 buyoffer()

 function quit(message) {
    console.log(message);
    process.exit(0);
  }

  function fail(message) {
    console.error(message);
    process.exit(1);
  }
