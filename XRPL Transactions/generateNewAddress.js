const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'});
var fs = require('fs')

async function generateAddress(){
var Address = await api.generateAddress()
  
fs.appendFile('List of Testnet Address.txt', Address.address+'\n', function (err) {
    if (err) throw err;
  }); 
  fs.appendFile('List of Testnet Address.txt', Address.secret+'\n\n', function (err) {
    if (err) throw err;
    console.log(Address,' has been Saved!');
  }); 
}

generateAddress()
