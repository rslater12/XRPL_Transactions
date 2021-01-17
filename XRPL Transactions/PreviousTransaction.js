const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'}); // testnet

const Address = ''; //sender/source address
const secret = ''; // secret key


    /* check previous transaction hash ID */
    async function PreviousTransaction(){
		await api.connect()
					try{
					await Address;
                    tx =  await api.getAccountInfo(Address).then(info =>  tx = info.previousAffectingTransactionID)
                    .then(quit, fail);
					console.log('\x1b[33m%s\x1b[0m',"Successfully Checked for Previous Transaction: " + tx)
					 }catch (error) {
					console.error(error);
					console.log('\x1b[31m%s\x1b[0m',"Error, Checking Transaction Hash")
					 }
		}
        
        PreviousTransaction()


function quit(message) {
    console.log(message);
    process.exit(0);
  }

  function fail(message) {
    console.error(message);
    process.exit(1);
  }