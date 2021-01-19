const RippleAPI = require('ripple-lib').RippleAPI;
const client = require('rippled-ws-client')	
const api = new RippleAPI({server: 'wss://xrpl.ws'}); 


var Address = ""
let tx = ""

async function checkHistory(){
	await api.connect()

try{
	await srcAddress
tx = await api.getTransactions(Address)
console.log('\x1b[33m%s\x1b[0m',"Successfully Checked Transaction History: " + tx)

}catch (error) {
	console.error(error);
	console.log('\x1b[31m%s\x1b[0m',error)
 }try {
	console.log(await tx.specification)
	for (i = 0; i <tx.length; i++) {
		txmemo = tx[i].specification.memos;
		
	  }
	console.log('\x1b[33m%s\x1b[0m',"Successfully Checked Transaction History: " + JSON.stringify(txmemo, null, 2))

}catch (error) {
	console.error(error);
	console.log('\x1b[31m%s\x1b[0m',error)
 }
}
checkHistory() 

/*not all transactions show in the history for ripple lib so use rippled-ws-client*/
//below example is filtering out just 3 types of check transactions
async function txhistory(){
  
    new client(URL).then(connection => { // change server to failsafe variable
              console.log('Connected')
              connection.send({
          
            command: "account_tx",
            
            account: srcAddress,
            ledger_index_min: -1,
            ledger_index_max: -1,
           // limit: 20,
            forward: true
          
              }).then(reply => { 
                  //console.log('Your Balance')
              //	console.log(reply.transactions)
          connection.close()
          data = reply.transactions
  
              for (i = 0; i <data.length; i++) {
                var type = data[i].tx.TransactionType
                var type1 = data[i].tx.TransactionType
                var type2 = data[i].tx.TransactionType
                 if(type === "CheckCreate"){
  console.log("Checks Found : " + type)
  for (var key in data[i].tx.Memos) {
  for (var b = 0; b <data[i].tx.Memos.length; b++) {
    console.log("Check Create Memo: "+data[i].tx.Memos[b].Memo.MemoData)
    
                    }
                  }
                 } 
                 else if(type === "CheckCash"){
                  console.log("Checks Found : " + type1)
                  for (var key in data[i].tx.Memos) {
                  for (var b = 0; b <data[i].tx.Memos.length; b++) {
  console.log("Check Accept Memo: "+data[i].tx.Memos[b].Memo.MemoData)
  
                  }
                }
                 } 
                else if(type === "CheckCancel"){
                  console.log("Checks Found : " + type2)
                  for (var key in data[i].tx.Memos) {
                  for (var b = 0; b <data[i].tx.Memos.length; b++) {
                    console.log("Check Reject Memo: "+data[i].tx.Memos[b].Memo.MemoData)
                    
                                    }
                                  }
                 } 
                 
                }
             
              
              }) 
  
          })	 
  
               
            
            
            
  }
  txhistory()
  
  