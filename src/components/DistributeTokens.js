import React, { useState } from 'react';

function DistributeTokens({ sendTokensToEth }) {
  const [oneaddress, setOneadress] = useState('');
  const [amount, setAmount] = useState(0);
  const [ethaddress, setEthaddress] = useState('');
  const [addressList, setAddressList] = useState([]);

  const addAddress = () => {
    setAddressList([...addressList, ethaddress]);
    setEthaddress('');
  }

  const distributeTokens = async () => {
    for(let address of addressList){
      await sendTokensToEth(oneaddress, address, amount);
    }
  }

  return (
    <div>
      <h2>Distribute Tokens</h2>

      {addressList.map(address => {
        return <p key={address}>{address}</p>;
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
