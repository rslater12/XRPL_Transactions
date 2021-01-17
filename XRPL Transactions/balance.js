const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://rippled-dev.xrpayments.co'}); // Livenet
const Address = ""

async function balance(){
    await api.connect()
    console.log('Connected...')
     try{         
    var balance =  await api.getAccountInfo(Address).then(info =>  balance = info.xrpBalance)
    .then(quit, fail)
    console.log(balance)
}
    catch (error){
        console.log(error)
    }
}

balance()

function quit(message) {
    console.log(message);
    process.exit(0);
  }

  function fail(message) {
    console.error(message);
    process.exit(1);
  }