import React, { useState } from 'react';

function Form({ sendTokens }) {
  const [ethaddress, setEthaddress] = useState('');
  const [oneaddress, setOneadress] = useState('');
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <h2>Send token</h2>
      <input
        type="text"
        placeholder="Eth Address"
        onChange={e => setEthaddress(e.target.value)} />
      <br />
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
      <button onClick={() => sendTokens(ethaddress, oneaddress, amount)}>
        Send
      </button>
    </div>
  );
}

export default Form;
