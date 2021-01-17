const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'}); // testnet

const Address = ''; //sender/source address
const secret = ''; // secret key


/* set require destination tag */ 
async function asfReuireDest(){	  
    
    const transaction = {
        "TransactionType": "AccountSet" ,
        "Account": Address,
        "Fee": "12000",
        "Flags": 0,
        "SetFlag": 1

            };
    
          api.connect().then(() => {
            console.log('Connected...');
            return api.prepareTransaction( transaction).then(prepared => { 
              console.log('Set Require Destination Tag prepared...');
              const {signedTransaction} = api.sign(prepared.txJSON, secret);
              console.log('Set Require Destination Tag signed...');
              api.submit(signedTransaction).then(quit, fail);
            });
          }).catch(fail);
    }
    
    asfReuireDest()

function quit(message) {
    console.log(message);
    process.exit(0);
  }

  function fail(message) {
    console.error(message);
    process.exit(1);
  }