const Debug = require('debug')
const Client = require('rippled-ws-client')
const {LiquidityCheck} = require('xrpl-orderbook-reader')
const log = Debug('orderbook')

const main = async () => {
  const Connection = await new Client('wss://xrpl.ws')
  Connection.on('error', e => log(`XRPL Error`, e))

  const CheckSell = new LiquidityCheck({
    trade: {
      from: {
        currency: 'XRP'
      },
      amount: 1,
      to: {
        currency: 'USD',
        issuer: 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq'
      }
    },
    options: {
      rates: 'from',
      maxSpreadPercentage: 3,
      maxSlippagePercentage: 4,
      maxSlippagePercentageReverse: 5
    },
    method: Connection.send
  })
  const CheckBuy = new LiquidityCheck({
    trade: {
      from: {
        currency: 'XRP'
      },
      amount: 1,
      to: {
        currency: 'EUR',
        issuer: 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq'
      }
    },
    options: {
      rates: 'to',
      maxSpreadPercentage: 3,
      maxSlippagePercentage: 4,
      maxSlippagePercentageReverse: 5
    },
    method: Connection.send
  }) 

    return CheckSell.get().then(LiquiditySell => {
    console.log("Sell 1 USD for XRP @ "+LiquiditySell.rate.toFixed(6)+" XRP" )

    CheckBuy.get().then(LiquidityBuy => {
    console.log("Buy Euro with 1 XRP @"+LiquidityBuy.rate.toFixed(6)+" EUR")

    var CrossCurrencyExchangeRate = LiquiditySell.rate.toFixed(6) * LiquidityBuy.rate.toFixed(6)
    console.log("Cross Currency Exchange rate $1 = €"+CrossCurrencyExchangeRate.toFixed(6))

    Connection.close()
    }) 
      })
}

main()