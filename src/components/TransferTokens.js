import React, { useState } from 'react';

function TransferTokens({ sendTokensToOne, sendTokensToEth }) {
  const [ethaddress, setEthAddress] = useState('');
  const [oneaddress, setOneAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const getEthWalletAddress = async () => {
    const accounts = await window.web3.eth.getAccounts();
    setEthAddress(accounts[0]);
  }

  const getOneWalletAddress = () => {
    try{
      setTimeout(() => {
        window.onewallet
          .getAccount()
          .then(({ address }) => setOneAddress(address));
      }, 3000)
    }
    catch(e){
      console.error(e);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 m-auto">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">Transfer Tokens</h2>

              <h5 className="text-muted">ETH Wallet Address:</h5>
              {!ethaddress
                ? <button className="btn secondary-color" onClick={() => getEthWalletAddress()}>Connect With ETH Wallet</button>
                : <p>{ethaddress}</p>
              }

              <h5 className="text-muted mt-3">One Wallet Address:</h5>
              {!oneaddress
                ? <button className="btn secondary-color" onClick={() => getOneWalletAddress()}>Connect With One Wallet</button>
                : <p>{oneaddress}</p>
              }

              <div className="form-group mt-3 mb-4">
                <label className="text-muted font-weight-bold" htmlFor="text">Amount</label>
                <input
                    className="form-control"
                    type="number"
                    name="Name"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} 
                />
              </div>

              <div className="d-flex flex-column">
                <button
                  className="btn primary-color mb-2"
                  onClick={() => sendTokensToOne(oneaddress, ethaddress, amount)}
                  disabled={!oneaddress || !ethaddress || amount == 0}>
                  Send BUSD token From ETH Wallet to One Wallet
                </button>
                <button
                  className="btn primary-color"
                  onClick={() => sendTokensToEth(oneaddress, ethaddress, amount)}
                  disabled={!oneaddress || !ethaddress || amount == 0}>
                  Send BUSD token From One Wallet to ETH Wallet 
                </button>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default TransferTokens;
