import React, { useState } from 'react';

import Spinner from './common/Spinner';
import ButtonSpinner from './common/ButtonSpinner';
import AddAddressModal from './AddAddressModal';

function DistributeTokens({ sendTokensToEth }) {
  const [oneaddress, setOneAddress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [onewalletLoading, setOnewalletLoading] = useState(false);

  const addAddress = (ethaddress, amount) => {
    const newAddress = {
      address: ethaddress,
      receiveToken: "no",
      amount: amount,
      transactionHash: null
    }
    setAddressList([...addressList, newAddress]);
    setTotalAmount(+totalAmount + +amount);
  }

  const distributeTokens = async () => {
    setLoading(true);

    for(let address of addressList){
      if(address.receiveToken !== "yes"){
        address.receiveToken = "pending";
        setAddressList([...addressList]);

        const transactionHash = await sendTokensToEth(oneaddress, address.address, address.amount);

        if(transactionHash){
          address.receiveToken = "yes";
          address.transactionHash = transactionHash;
          setAddressList([...addressList]);
          setTotalAmount(+totalAmount - +address.amount);
        }
      }
    }

    setLoading(false);
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
      <h2 className="text-center my-2">Distribute Tokens</h2>

      <div className="row">
        <div className="col-12 col-md-5">
          <div className="card">
            <div className="card-body">
              <h5>One Wallet Address:</h5>
              {!oneaddress
                ? (
                    <button className="btn secondary-color" onClick={() => getOneWalletAddress()} disabled={onewalletLoading}>
                      {onewalletLoading && <ButtonSpinner />}
                      {onewalletLoading ? 'Fetching' : 'Connect With One Wallet'}
                    </button>
                  )
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
                onClick={() => distributeTokens()}
                disabled={!oneaddress || loading}
                >
                {loading && <ButtonSpinner />}
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
                          <td>{address.address.substring(0,8)}...{address.address.substring(34,42)}</td>
                          <td>{address.amount}</td>
                          <td>{address.receiveToken === "yes" && (address.transactionHash.substring(0,8) + "..." + address.transactionHash.substring(58,66))} {address.receiveToken === "pending" && <Spinner />}</td>
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
