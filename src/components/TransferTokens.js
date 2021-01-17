import React, { useState } from 'react';

import ETHtoONE from './ETHtoONE';
import ONEtoETH from './ONEtoETH';

function TransferTokens({ sendTokensToOne, sendTokensToEth }) {
  const [ethaddress, setEthAddress] = useState('');
  const [oneaddress, setOneAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [onewalletLoading, setOnewalletLoading] = useState(false);
  const [type, setType] = useState('ETHtoOne');
  const [tokenType, setTokenType] = useState('');

  const getEthWalletAddress = async () => {
    const accounts = await window.web3.eth.getAccounts();
    setEthAddress(accounts[0]);
  }

  const getOneWalletAddress = () => {
    try{
      setOnewalletLoading(true);
      setTimeout(() => {
        window.onewallet
          .getAccount()
          .then(({ address }) => setOneAddress(address));
          
        setOnewalletLoading(false);
      }, 3000)
    }
    catch(e){
      console.error(e);
      setOnewalletLoading(false);
    }
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">Transfer Tokens</h2>

      <div className="row">
        <div className="col-12 col-md-6 m-auto">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-around mb-4">
                <button className={type === "ETHtoOne" ? "btn btn-lg borderline-primary" : "btn btn-lg"} onClick={() => setType("ETHtoOne")}>
                  ETH &gt; ONE
                </button>
                <button className={type !== "ETHtoOne" ? "btn btn-lg borderline-primary" : "btn btn-lg"} onClick={() => setType("OnetoETH")}>
                  ONE &gt; ETH
                </button>
              </div>

              {type === "ETHtoOne"
                ? <ETHtoONE
                    ethaddress={ethaddress}
                    getEthWalletAddress={getEthWalletAddress}
                    oneaddress={oneaddress}
                    getOneWalletAddress={getOneWalletAddress}
                    onewalletLoading={onewalletLoading}
                    amount={amount}
                    setAmount={setAmount}
                    sendTokensToOne={sendTokensToOne}
                    tokenType={tokenType}
                    setTokenType={setTokenType} />
                : <ONEtoETH
                    ethaddress={ethaddress}
                    getEthWalletAddress={getEthWalletAddress}
                    oneaddress={oneaddress}
                    getOneWalletAddress={getOneWalletAddress}
                    onewalletLoading={onewalletLoading}
                    amount={amount}
                    setAmount={setAmount}
                    sendTokensToEth={sendTokensToEth}
                    tokenType={tokenType}
                    setTokenType={setTokenType} />
              }
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default TransferTokens;
