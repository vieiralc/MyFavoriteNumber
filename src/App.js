import React, { Component } from 'react'
import Web3 from 'web3'
import ABI from './contract/ABI.json'
import { DotLoader } from 'react-spinners'
import { css } from 'react-emotion'
import { Alert, Button } from 'react-bootstrap'
import './App.css'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`

const address = '0xb86CE7CE17E82eF7cab5ed8a86B736A494fE3935'

const metaMaskNotInstalled = (
  <div style={{marginTop: '25px'}} className="container">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h1>Please install MetaMask or login in order to use this website</h1>
        <a href="https://metamask.io/" target="blank">Click here to install</a>
      </div>
    </div>
  </div>
)

const wrongNetwork = (
  <div style={{marginTop: '25px'}} className="container">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h1>Please login on ropsten test net</h1>
      </div>
    </div>
  </div>
)

class App extends Component {

  constructor() {
    super()

    this.state = {
      isConnected: false,
      correctNetwork: false,
      currentNumber: '',
      currentPrice: '',
      newNumber: '',
      loading: false,
      show: false,
    }

    if (typeof window.web3 !== 'undefined')
      this.web3 = new Web3(window.web3.currentProvider)
    //else
      //this.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/dc6b700a39d540469573d509928ceb46'))

    this.contract = ''
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleDismiss = this.handleDismiss.bind(this)
    this.handleShow = this.handleShow.bind(this)
  }

  componentWillMount() {
    this.web3.version.getNetwork((err, netId) => {
      if (netId === '3') {
        this.setState({correctNetwork: true})
      }
    })

    if (this.web3 && this.web3.isConnected() && this.web3.eth.accounts.length > 0) {
      
      this.setState({isConnected: true})
      this.contract = this.web3.eth.contract(ABI).at(address)
      this.web3.eth.defaultAccount = this.web3.eth.accounts[0]

      this.getCurrentNumber()
      this.getCurrentPrice()

      this.contract.newNumber().watch((err, res) => {
        if (!err) {
          this.setState({currentNumber: res.args._number.toNumber()})
          this.getCurrentPrice()
        }
        
        document.getElementById("overlay").style.display = "none"
        this.setState({loading: false})
      })
    }
  }

  getCurrentNumber() {
    this.contract.number((err, res) => {
      if (err)
        this.setState({currentNumber: 'Unavailable'})
      
      this.setState({currentNumber: res.toNumber()})
    })
  }

  getCurrentPrice() {
    this.contract.price((err, res) => {
      if (err)
        this.setState({currentPrice: 'Unavailable'})
      this.setState({currentPrice: this.web3.fromWei(res.toNumber(), "ether")})
    })
  }

  onChange(e) {
    this.setState({ newNumber: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    document.getElementById("overlay").style.display = "block"
    this.setState({loading: true})

    let currentPriceinWei = this.web3.toWei(this.state.currentPrice, "ether")
    
    this.contract.setNumber(this.state.newNumber, 
      {from: this.web3.eth.defaultAccount, value:  currentPriceinWei, gas: 300000}, (err, res) => {
        if (err && this.state.loading) {
          this.setState({loading: false})
          document.getElementById("overlay").style.display = "none"
          this.handleShow()
        }
      }
    )
    
    this.setState({newNumber: ''})
  }

  handleShow() {
    this.setState({ show: true })
  }

  handleDismiss() {
    this.setState({ show: false })
  }

  render() {
    
    if (this.state.isConnected && this.state.correctNetwork) {
      return (
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
                  <div id="overlay">
                    <div id="text">
                      <span style={{fontSize: '16px', fontFamily: 'Cursive'}}>Transactions on blockchain might take a while
                      Please wait...</span>
                      <DotLoader
                        className={override}
                        loading={this.state.loading}
                        color={'#fff'}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-4">
                  {
                    this.state.show ?
                      (
                        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                          <h4>Oh snap! You got an error!</h4>
                          <p>Change this and that and try again.</p>
                          <p><Button className='btn btn-info btn-block mt-4' onClick={this.handleDismiss}>Hide Alert</Button></p>
                        </Alert>
                      ) : ''
                  }
                </div>
              </div>

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
                        placeholder="Type your number"
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
    } else if (!this.state.isConnected)
      return metaMaskNotInstalled
    else if (!this.state.correctNetwork)
      return wrongNetwork
  }
}

export default App;
