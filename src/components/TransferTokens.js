import React, { useState } from 'react';

function TransferTokens({ sendTokensToOne, sendTokensToEth }) {
  const [ethaddress, setEthAddress] = useState('');
  const [oneaddress, setOneAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const getEthWalletAddress = async () => {
    const accounts = await window.web3.eth.getAccounts();
    setEthAddress(accounts[0]);
  }

  const getOneWalletAddress = () => {
    try{
      setTimeout(() => {
        window.onewallet
          .getAccount()
          .then(({ address }) => setOneAddress(address));
      }, 3000)
    }
    catch(e){
      console.error(e);
    }
  }

  return (
    <div>
      <h2>Transfer Tokens</h2>

      <h5>Your Eth address:</h5>
      {!ethaddress
        ? <button onClick={() => getEthWalletAddress()}>Connect With Eth Wallet</button>
        : <p>{ethaddress}</p>
      }

      <br />
      <br />

      <h5>Your One Wallet Address:</h5>
      {!oneaddress
        ? <button onClick={() => getOneWalletAddress()}>Connect With One Wallet</button>
        : <p>{oneaddress}</p>
      }

      <br />
      <br />
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
      <button onClick={() => sendTokensToEth(oneaddress, ethaddress, amount)}>
        Send BUSD token From One Wallet to Metamask 
      </button>
    </div>
  );
}

export default TransferTokens;
