import React from 'react';

import ButtonSpinner from './common/ButtonSpinner';

function ONEtoETH({
  ethaddress,
  getEthWalletAddress,
  oneaddress,
  getOneWalletAddress,
  onewalletLoading,
  amount,
  setAmount ,
  sendTokensToEth
}) {
  return (
    <>
      <h5 className="text-muted">From One Wallet Address:</h5>
      {!oneaddress
        ? (
            <button className="btn secondary-color" onClick={() => getOneWalletAddress()} disabled={onewalletLoading}>
              {onewalletLoading && <ButtonSpinner />}
              {onewalletLoading ? 'Fetching' : 'Connect With One Wallet'}
            </button>
          )
        : <p>{oneaddress}</p>
      }

      <h5 className="text-muted mt-3">To ETH Wallet Address:</h5>
      {!ethaddress
        ? <button className="btn secondary-color" onClick={() => getEthWalletAddress()}>Connect With ETH Wallet</button>
        : <p>{ethaddress}</p>
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
          className="btn primary-color"
          onClick={() => sendTokensToEth(oneaddress, ethaddress, amount)}
          disabled={!oneaddress || !ethaddress || amount == 0}>
          Send BUSD token From One Wallet to ETH Wallet 
        </button>
      </div>
    </>
  );
}

export default ONEtoETH;
