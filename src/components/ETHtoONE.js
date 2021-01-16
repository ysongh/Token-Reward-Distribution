import React from 'react';

import ButtonSpinner from './common/ButtonSpinner';

function ETHtoONE({
  ethaddress,
  getEthWalletAddress,
  oneaddress,
  getOneWalletAddress,
  onewalletLoading,
  amount,
  setAmount ,
  sendTokensToOne
}) {
  return (
    <>
      <h5 className="text-muted">From ETH Wallet Address:</h5>
      {!ethaddress
        ? <button className="btn secondary-color" onClick={() => getEthWalletAddress()}>Connect to ETH Wallet</button>
        : <p>{ethaddress}</p>
      }

      <h5 className="text-muted mt-3">To ONE Wallet Address:</h5>
      {!oneaddress
        ? (
            <button className="btn secondary-color" onClick={() => getOneWalletAddress()} disabled={onewalletLoading}>
              {onewalletLoading && <ButtonSpinner />}
              {onewalletLoading ? 'Fetching' : 'Connect to ONE Wallet'}
            </button>
          )
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
          Send BUSD token
        </button>
      </div>
    </>
  );
}

export default ETHtoONE;
