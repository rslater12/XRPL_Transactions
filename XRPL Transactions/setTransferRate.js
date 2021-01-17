const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'}); // testnet

const Address = ''; //sender/source address
const secret = ''; // secret key


async function setTransferRate(){	   
  
    api.connect().then(() => {
        
        return api.prepareTransaction({
            TransactionType: 'AccountSet',
            Account: Address,
            Fee: "10",
            TransferRate: 1050000000 // change from 5 to 2.5??
            
          }).then(prepared => {
                console.log('Set Transfer Rate prepared...');
                const {signedTransaction} = api.sign(prepared.txJSON, secret);
                console.log('Set Transfer Rate signed...');
                api.submit(signedTransaction).then(quit, fail);
              }); 
        }).catch(fail);
  }

  setTransferRate()

  function quit(message) {
    console.log(message);
   process.exit(0);
  }

  function fail(message) {
    console.error(message);
   process.exit(1);
  }
