import React, { Component} from 'react';
import { BridgeSDK } from 'bridge-sdk';

import './App.css';

class App extends Component {
  async componentDidMount(){
    const configs = require('bridge-sdk/lib/configs');
    const bridgeSDK = new BridgeSDK({ logLevel: 0 });

    await bridgeSDK.init(configs.testnet);

    bridgeSDK.setUseMetamask(true);
    bridgeSDK.setUseOneWallet(true);
  }

  render(){
    return (
      <div className="App">
        <h1>Fund Restaurant</h1>
      </div>
    );
  }
}

export default App;