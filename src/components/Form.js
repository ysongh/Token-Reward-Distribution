import React, { useState } from 'react';

function Form({ account, sendTokens }) {
  const [oneaddress, setOneadress] = useState('');
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <h2>Send token</h2>
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
      <button onClick={() => sendTokens(oneaddress, amount)}>
        Send
      </button>
    </div>
  );
}

export default Form;
