const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'}); // testnet

const Address = ''; //sender/source address
const secret = ''; // secret key
const dstAddress = ''; //destination address
const dstTag = '1'; //destination tag

async function payment(){
    const payment = {
		
        source: {
            address: Address,
            maxAmount: {
              value: '1.001',
              currency: 'XRP'
            }
          },
          destination: {
            address: dstAddress,
            //tag: dstTag,
            amount: {
              value: '10',
              currency: 'XRP'
            }
          }
        };
      
      api.connect().then(() => {
        console.log('Connected...');
        return api.preparePayment(Address, payment).then(prepared => {
          console.log('Payment transaction prepared...');
          const {signedTransaction} = api.sign(prepared.txJSON, secret);
          console.log('Payment transaction signed...');
          api.submit(signedTransaction).then(quit, fail);
          
        });
      }).catch(fail);
}

payment()

function quit(message) {
    console.log(message);
    process.exit(0);
  }

  function fail(message) {
    console.error(message);
    process.exit(1);
  }
