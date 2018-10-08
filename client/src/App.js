import React, { Component } from 'react';
import Web3 from 'web3'
import ABI from './contract/ABI.json'
import './app.css'

const address = '0xb86CE7CE17E82eF7cab5ed8a86B736A494fE3935'

const metaMaskNotInstalled = (
  <div style={{marginTop: '25px'}} className="container">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h1>Please install MetaMask or log in ir order to use this website</h1>
        <a href="https://metamask.io/" target="blank">Click here to install</a>
      </div>
    </div>
  </div>
)

class App extends Component {

  constructor() {
    super()

    this.state = {
      isInstalled: false,
      currentNumber: '',
      currentPrice: '',
      newNumber: ''
    }

    this.web3 = ''
    this.contract = ''
    this.infuraContract = ''

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (window.web3) {      
      
      this.web3 = new Web3(window.web3.currentProvider)
      
      if (this.web3.eth.accounts.length > 0) {
        this.setState({isInstalled: true})
        this.web3.eth.defaultAccount = this.web3.eth.accounts[0]

        this.infuraWeb3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/dc6b700a39d540469573d509928ceb46'))

        this.contract = this.web3.eth.contract(ABI).at(address)
        this.infuraContract = this.infuraWeb3.eth.contract(ABI).at(address)

        this.contract.number((err, res) => {
          if (err)
            this.setState({currentNumber: 'Unavailable'})
          
          this.setState({currentNumber: res.toNumber()})
        })
        
        this.setState({
          currentPrice: this.web3.fromWei(this.infuraContract.price().toNumber(), "ether")
        })
      }
    }
  }

  onChange(e) {
    this.setState({ newNumber: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    let currentPriceinWei = this.web3.toWei(this.state.currentPrice, "ether")
    console.log(currentPriceinWei)
    this.contract.setNumber(this.state.newNumber, 
      {from: this.web3.eth.defaultAccount, value:  currentPriceinWei, gas: 300000}, (err, res) => {
        if (err)
          console.log(err)
      })
  }

  render() {
    
    return !this.state.isInstalled ? metaMaskNotInstalled : (
      <header>
        <div className="sun"></div>
        <div className="cloud c1"></div>
        <div className="cloud c2"></div>
        <div className="cloud c3"></div>
        <div className="cloud c4"></div>
        <div className="cloud c5"></div>
        <div className="day"></div>  
        <div className="moon"></div>          
        <div className="horizon"></div>      

        <div className="walk"></div>
        
        <h1>
          <div className="block">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="number"></label>
                    <input 
                      value={this.state.newNumber}
                      onChange={this.onChange}
                      type="number" 
                      min="0" 
                      className="form-control" 
                      id="number" 
                      placeholder="Type your favorite number"
                    />
                    <small id="number" style={{fontSize: '11px'}} className="form-text text-muted">Your number is now safe.</small>
                  </div>
              
                  <button type="submit" className="btn btn-info btn-block">Save!</button>
                </form>
                <div style={{fontSize: '16px', fontFamily: 'cursive'}}>Current Number: &nbsp;  {this.state.currentNumber}</div>
                <div style={{fontSize: '10px', fontFamily: 'cursive', marginTop: '5px'}} >Current Price: &nbsp; {this.state.currentPrice} ETH</div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <span style={{fontSize: '14px', marginTop: '25px', fontFamily: 'cursive'}}>Save your favorite number on ethereum blockchain!</span>
          </div>
        </h1>
      </header>

    )
  }
}

export default App;
