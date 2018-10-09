require('dotenv').load()

const HDWalletProvider = require("truffle-hdwallet-provider")

module.exports = {
  
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match anynetwork id
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://ropsten.infura.io/v3/" + process.env.apiKey),
      network_id: 3,
      gas: 3000000,
      gasPrice: 21
    },
    mainnet: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://mainnet.infura.io/v3/" + process.env.apiKey),
      network_id: 1,
      gas: 5000000,
      gasPrice: 25000000000
    }
  },

  solc: {
		optimizer: {
			enabled: true,
			runs: 200
		}
	},

}
