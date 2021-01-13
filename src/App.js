import React, { Component} from 'react';
import { BridgeSDK, TOKEN, EXCHANGE_MODE } from 'bridge-sdk';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Web3 from 'web3';

import './App.css';
import Navbar from './components/layout/Navbar';
import Form from './components/Form';
import DistributeTokens from './components/DistributeTokens';

class App extends Component {
  state = {
    account: '',
    bridgeSDK: null
  }

  async componentDidMount(){
    await this.loadWeb3();

    const accounts = await window.web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const configs = require('bridge-sdk/lib/configs');
    const bridgeSDK = new BridgeSDK({ logLevel: 0 });

    await bridgeSDK.init(configs.testnet);

    bridgeSDK.setUseMetamask(true);
    bridgeSDK.setUseOneWallet(true);

    this.setState({ bridgeSDK });
  }

  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async sendTokensToOne(oneaddress, amount){
    let operationId;

    try {
      await this.state.bridgeSDK.sendToken({
        type: EXCHANGE_MODE.ETH_TO_ONE,
        token: TOKEN.BUSD,
        amount: amount,
        oneAddress: oneaddress,
        ethAddress: this.state.account,
      }, (id) => operationId = id);
    } catch (e) {
      console.log(e.message);
    }

    const operation = await this.state.bridgeSDK.api.getOperation(operationId);
    console.log(operation);
  }

  async sendTokensToEth(oneaddress, ethAddress, amount){
    let operationId;

    try {
      await this.state.bridgeSDK.sendToken({
        type: EXCHANGE_MODE.ONE_TO_ETH,
        token: TOKEN.BUSD,
        amount: amount,
        oneAddress: oneaddress,
        ethAddress: ethAddress,
      }, (id) => operationId = id);
    } catch (e) {
      console.log(e.message);
    }

    const operation = await this.state.bridgeSDK.api.getOperation(operationId);
    console.log(operation);
  }

  render(){
    return (
      <Router className="App">
        <Navbar />
        <Switch>
          <Route path="/transfer">
            <Form
              account={this.state.account}
              sendTokensToOne={this.sendTokensToOne.bind(this)}
              sendTokensToEth={this.sendTokensToEth.bind(this)} />
          </Route>
          <Route path="/">
            <DistributeTokens sendTokensToEth={this.sendTokensToEth.bind(this)} />
          </Route>
        </Switch>
        
        
      </Router>
    );
  }
}

export default App;