import React, { useState } from 'react';

function DistributeTokens({ sendTokensToEth }) {
  const [oneaddress, setOneadress] = useState('');
  const [amount, setAmount] = useState(0);
  const [ethaddress, setEthaddress] = useState('');
  const [addressList, setAddressList] = useState([]);

  const addAddress = () => {
    const newAddress = {
      address: ethaddress,
      receiveToken: false
    }
    setAddressList([...addressList, newAddress]);
    setEthaddress('');
  }

  const distributeTokens = async () => {
    for(let address of addressList){
      if(!address.receiveToken){
        await sendTokensToEth(oneaddress, address.address, amount);
        
        address.receiveToken = true;
        setAddressList([...addressList]);
      }
    }
  }

  return (
    <div>
      <h2>Distribute Tokens</h2>

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
        type="text"
        placeholder="One Address"
        value={oneaddress}
        onChange={e => setOneadress(e.target.value)} />
      <br />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)} />
      <br />
      <button onClick={() => distributeTokens()}>
        Distribute Tokens
      </button>
    </div>
  );
}

export default DistributeTokens;
