# XRPL_Transactions
XRP Transaction Types for the XRPL.

added and tested the follwoing either on Livenet or Testnet.

get balance,
cash a check,
create a check,
delete a check,
get check object by sender,
get check object by reciptent,
create DEX offer,
convert drops to xrp,
convert xrp to drops,
get account settings,
get account obligations,
get order book,
previoulsy effecting transactions,
set require destination tag for account,
set transfer rate for account,
set a trustline for the account,
get transaction history (unable to get some transaction history using ripple lib like checks so added code using rippled-ws-client)

Not tested setTrustline.js, CreateDEXoffer.js or getTransactionHistory.js

getOrderBook.js doesnt work (or not complete)

