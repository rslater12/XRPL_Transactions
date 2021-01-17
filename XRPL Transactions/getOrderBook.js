const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'}); // testnet

const Address = ''; //sender/source address
const secret = ''; // secret key

/*!!!!!!!!!!!!!!!!!!Not Working!!!!!!!!!!!!!!!!!!!*/

api.connect().then(function() {

    var book = api.Orderbook.createOrderBook(api, {
      currency_gets: 'XRP',
      issuer_pays: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',
      currency_pays: 'USD'
    });

    book.on('model', function(offers) {
      console.log(offers);
    });
  });
