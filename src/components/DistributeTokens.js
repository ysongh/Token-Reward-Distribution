import React, { useState } from 'react';

import AddAddressModal from './AddAddressModal';

function DistributeTokens({ sendTokensToEth }) {
  const [oneaddress, setOneadress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const addAddress = (ethaddress, amount) => {
    const newAddress = {
      address: ethaddress,
      receiveToken: false,
      amount: amount
    }
    setAddressList([...addressList, newAddress]);
    setTotalAmount(+totalAmount + +amount);
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
              <div className="d-flex justify-content-between align-items-center">
                <h2>List of Addresses</h2>
                <button className="btn secondary-color"  data-toggle="modal" data-target="#addAddressModal">
                  Add
                </button>
              </div>

              <div className="table-responsive">
                <table className="table mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Address</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addressList.map(address => {
                      return (
                        <tr key={address.address}>
                          <td>{address.address}</td>
                          <td>{address.amount}</td>
                          <td>{address.receiveToken ? "Yes" : "No"}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <AddAddressModal addAddress={addAddress}/>
    </div>
  );
}

export default DistributeTokens;
