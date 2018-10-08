# MyFavoriteNumber
Playing around with solidity and ethereum main net

### Web3js instructions

```npm install web3@0.20.1
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
web3.eth.blockNumber
web3.eth.getBlock(3, (err, res) => console.log(JSON.stringify(res))
web3.eth.accounts
web3.toWei('1', 'ether')
web3.fromWei('21000000000000', 'finney')
const myContract = web3.eth.contract(abiArray).at(contractAdress)
myContract.address
web3.eth.defaultAccount = 'address' // must define default account. The contract uses the default accounts to pay the gas used by the contract
myContract.setNumber(7)
myContract.getNumber().toNumber() // returns BigNumber by default so use toNumber() web3 method
web3.eth.sendTransaction({ from: sender, to: receiver, value: amount})


// getting balance from parity port 8541
node
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8541'))
web3.eth.accounts
web3.fromWei(web3.eth.getBalance("0x00aa39d30f0d20ff03a22ccfc30b7efbfca597c2")
, "ether").toNumber()
```
