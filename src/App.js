import React, { Component} from 'react';
import { BridgeSDK, TOKEN, EXCHANGE_MODE } from 'bridge-sdk';

import './App.css';
import Form from './components/Form';

class App extends Component {
  state = {
    bridgeSDK: null
  }

  async componentDidMount(){
    const configs = require('bridge-sdk/lib/configs');
    const bridgeSDK = new BridgeSDK({ logLevel: 0 });

    await bridgeSDK.init(configs.testnet);

    bridgeSDK.setUseMetamask(true);
    bridgeSDK.setUseOneWallet(true);

    this.setState({ bridgeSDK });
  }

  async sendTokens(ethaddress, oneaddress, amount){
    let operationId;

    try {
      await this.state.bridgeSDK.sendToken({
        type: EXCHANGE_MODE.ETH_TO_ONE,
        token: TOKEN.BUSD,
        amount: amount,
        oneAddress: oneaddress,
        ethAddress: ethaddress,
      }, (id) => operationId = id);
    } catch (e) {
      console.log(e.message);
    }

    const operation = await this.state.bridgeSDK.api.getOperation(operationId);
    console.log(operation);
  }

  render(){
    return (
      <div className="App">
        <h1>Fund Restaurant</h1>
        <Form sendTokens={this.sendTokens.bind(this)} />
      </div>
    );
  }
}

export default App;