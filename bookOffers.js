const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://rippled-dev.xrpayments.co'}); // testnet
const WebSocket = require('ws');
var url = 'wss://s1.ripple.com:51233';// wss://s.altnet.rippletest.net:51233
//gets orders book


/* XRPL Websocket */
//https://xrpl.org/monitor-incoming-payments-with-websocket.html
var socket = new WebSocket(url)
socket.addEventListener('open', (event) => {
  // This callback runs when the connection is open
  console.log("Connected to XRPL Server: ",url)
  const command = book()
 // socket.send(JSON.stringify(command))
})
/* socket.addEventListener('message', (event) => {
  console.log('Got message from XRPL server:', event.data);
  console.log('Transaction Success:', event.data.engine_result);
 
}) */
socket.addEventListener('close', (event) => {
  // Use this event to detect when you have become disconnected
  // and respond appropriately.
  console.log('Disconnected from XRPL server: ',url)
})

// accounts to fetch book
async function book() {
const response = await api_request({
    "id": 4,
    "command": "book_offers",
    "taker": "", // add taker
    "taker_gets": {
      "currency": "XRP"
    },
    "taker_pays": {
      "currency": "USD",
      "issuer": "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq"
    },
    "limit": 10
})
//console.log(response)
console.log(response.result.offers)

socket.close();
}

//handlers
const AWAITING = {}
const handleResponse = function(data) {
  if (!data.hasOwnProperty("id")) {
    console.error("Got response event without ID:", data)
    return
  }
  if (AWAITING.hasOwnProperty(data.id)) {
    AWAITING[data.id].resolve(data)
  } else {
    console.error("Response to un-awaited request w/ ID " + data.id)
  }
}
let autoid_n = 0
function api_request(options) {
  if (!options.hasOwnProperty("id")) {
    options.id = "autoid_" + (autoid_n++)
  }

  let resolveHolder;
  AWAITING[options.id] = new Promise((resolve, reject) => {
    // Save the resolve func to be called by the handleResponse function later
    resolveHolder = resolve
    try {
      // Use the socket opened in the previous example...
      socket.send(JSON.stringify(options))
    } catch(error) {
      reject(error)
    }
  })
  AWAITING[options.id].resolve = resolveHolder;
  return AWAITING[options.id]
}

const WS_HANDLERS = {
  "response": handleResponse
  // Fill this out with your handlers in the following format:
  // "type": function(event) { /* handle event of this type */ }
}
socket.addEventListener('message', (event) => {
  const parsed_data = JSON.parse(event.data)
  if (WS_HANDLERS.hasOwnProperty(parsed_data.type)) {
    // Call the mapped handler
    WS_HANDLERS[parsed_data.type](parsed_data)
  } else {
    console.log("Unhandled message from server", event)
  }
})


