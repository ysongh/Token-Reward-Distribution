import React, { useState } from 'react';

function DistributeTokens({ sendTokensToEth }) {
  const [oneaddress, setOneadress] = useState('');
  const [amount, setAmount] = useState(0);
  const [ethaddress, setEthaddress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(false);

  const addAddress = () => {
    const newAddress = {
      address: ethaddress,
      receiveToken: false
    }
    setAddressList([...addressList, newAddress]);
    setEthaddress('');
  }

  const distributeTokens = async () => {
    setLoading(true);

    for(let address of addressList){
      if(!address.receiveToken){
        await sendTokensToEth(oneaddress, address.address, amount);
        
        address.receiveToken = true;
        setAddressList([...addressList]);
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
    <div>
      <h2>Distribute Tokens</h2>

      <h5>Your One Wallet Address:</h5>
      {!oneaddress
        ? <button onClick={() => getOneWalletAddress()}>Connect With One Wallet</button>
        : <p>{oneaddress}</p>
      }
      <br />
      <br />
      <br />

      {addressList.map(address => {
        return (
          <div key={address.address}>
            <p>{address.address} - {address.receiveToken ? "Yes" : "No"}</p>
          </div>
          
        )
      })}

      <input
        type="text"
        placeholder="Eth Address"
        value={ethaddress}
        onChange={e => setEthaddress(e.target.value)} />
      <button onClick={() => addAddress()}>
        Add Address
      </button>
      <br />
      <br />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)} />
      <br />
      <button onClick={() => distributeTokens()} disabled={loading}>
        {loading ? "Pending" : "Distribute Tokens"}
      </button>
    </div>
  );
}

export default DistributeTokens;
