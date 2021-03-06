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
  sendTokensToOne,
  tokenType,
  setTokenType,
  loading,
  setLoading
}) {
  const transfer = async () => {
    setLoading(true);
    await sendTokensToOne(oneaddress, ethaddress, amount, tokenType);
    setLoading(false);
  }
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

      <div className="form-group mt-3">
        <label className="text-muted font-weight-bold" htmlFor="text">Amount</label>
        <input
            className="form-control"
            type="number"
            name="Name"
            value={amount}
            onChange={(e) => setAmount(e.target.value)} 
        />
      </div>

      <div className="form-group mb-4">
        <label className="text-muted font-weight-bold" htmlFor="text">Token Type</label>
        <select className="custom-select" onChange={(e) => setTokenType(e.target.value)}>
          <option>None</option>
          <option value="BUSD">BUSD</option>
          <option value="LINK">LINK</option>
        </select>
      </div>

      <div className="d-flex flex-column">
        <button
          className="btn primary-color mb-2"
          onClick={() => transfer()}
          disabled={!oneaddress || !ethaddress || !tokenType || amount == 0 || loading}>
            {loading && <ButtonSpinner />}
            {loading ? "Pending" : "Transfer to One Wallet"}
        </button>
      </div>
    </>
  );
}

export default ETHtoONE;
