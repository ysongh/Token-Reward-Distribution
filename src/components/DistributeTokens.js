import React, { useState } from 'react';

function DistributeTokens({ sendTokensToEth }) {
  const [oneaddress, setOneadress] = useState('');
  const [amount, setAmount] = useState(0);
  const [ethaddress, setEthaddress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const addAddress = () => {
    const newAddress = {
      address: ethaddress,
      receiveToken: false,
      amount: amount
    }
    setAddressList([...addressList, newAddress]);
    setTotalAmount(+totalAmount + +amount);
    setEthaddress('');
    setAmount(0);
  }

  const distributeTokens = async () => {
    setLoading(true);

    for(let address of addressList){
      if(!address.receiveToken){
        await sendTokensToEth(oneaddress, address.address, address.amount);
        
        address.receiveToken = true;
        setAddressList([...addressList]);
        setTotalAmount(+totalAmount - +address.amount);
      }
    }

    setLoading(false);
  }

  const getOneWalletAddress = () => {
    try{
      setTimeout(() => {
        window.onewallet
          .getAccount()
          .then(({ address }) => setOneadress(address));
      }, 3000)
    }
    catch(e){
      console.error(e);
    }
  }

  return (
    <div className="container">
      <h2 className="text-center my-2">Distribute Tokens</h2>

      <div className="row">
        <div className="col-12 col-md-5">
          <div className="card">
            <div className="card-body">
              <h5>One Wallet Address:</h5>
              {!oneaddress
                ? <button className="btn secondary-color" onClick={() => getOneWalletAddress()}>Connect With One Wallet</button>
                : <p>{oneaddress}</p>
              }
            </div>  
          </div>

          <div className="card my-3">
            <div className="card-body">
              <p>Total Addresses: {addressList.length}</p>
              <p>Total Amount: {totalAmount}</p>
              <p>Token Type: BUSD</p>
              <button
                className="btn primary-color btn-block"
                onClick={() => distributeTokens()} disabled={loading}
                disabled={!oneaddress || loading}
                >
                {loading ? "Pending" : "Distribute Tokens"}
              </button>
            </div>  
          </div>
        </div>

        <div className="col-12 col-md-7">
          <div className="card">
            <div className="card-body">
              <h2>List of Addresses</h2>
              {addressList.map(address => {
                return (
                  <div key={address.address}>
                    <p>{address.address} - {address.amount} - {address.receiveToken ? "Yes" : "No"}</p>
                  </div>
                )
              })}
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Eth Address"
                  value={ethaddress}
                  onChange={e => setEthaddress(e.target.value)} />
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)} />
                <button className="btn primary-color" onClick={() => addAddress()}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default DistributeTokens;
