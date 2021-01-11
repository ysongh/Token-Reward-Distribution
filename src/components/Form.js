import React, { useState } from 'react';

function Form({ account, sendTokensToOne, sendTokensToEth }) {
  const [oneaddress, setOneadress] = useState('');
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <h2>Transfer Tokens</h2>
      <p>Your Eth address: {account}</p>
      
      <input
        type="text"
        placeholder="One Address"
        onChange={e => setOneadress(e.target.value)} />
      <br />
      <input
        type="number"
        placeholder="Amount"
        onChange={e => setAmount(e.target.value)} />
      <br />
      <button onClick={() => sendTokensToOne(oneaddress, amount)}>
        Send BUSD token From Metamask to One Wallet
      </button>
      <br />
      <button onClick={() => sendTokensToEth(oneaddress, amount)}>
        Send BUSD token From One Wallet to Metamask 
      </button>
    </div>
  );
}

export default Form;
