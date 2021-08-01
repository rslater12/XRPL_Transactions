var md5 = require('md5');
const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'});

/*Set Gravatar */
async function setGravatar(){
    var Address = '';
    var secret = '';
    
    var hash = md5('example@gmail.com') //Gravatar Email Address
    var res = hash.toUpperCase()
    console.log(res)
      api.connect().then(() => {
          return api.prepareTransaction({
              TransactionType: 'AccountSet',
              Account: Address,
              Fee: '12',
              EmailHash: res
              
            }).then(prepared => {
                  console.log('Set XRPL Gravatar prepared...');
                  const {signedTransaction} = api.sign(prepared.txJSON, secret);
                  console.log('Set XRPL Gravatar signed...');
                  api.submit(signedTransaction)
                  //.then(quit, fail);
                }); 
          }).catch(fail);
        }