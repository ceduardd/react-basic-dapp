import { useState } from 'react';

import { ethers } from 'ethers';

import Greeting from './artifacts/contracts/Greeter.sol/Greeter.json';
import Token from './artifacts/contracts/Token.sol/Token.json';

import './App.css';

// const greeterAddress = '0xeF8fd069024e68E8801bDB658398EDdCED1Fc6FB';
const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const tokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

function App() {
  const [greeting, setGreetingValue] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [ammount, setAmmount] = useState(0);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(
        greeterAddress,
        Greeting.abi,
        provider
      );

      try {
        const data = await contract.greet();
        console.log({ data });
      } catch (error) {
        console.log({ error });
      }
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      // await requestAccount();
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);

      const balance = await contract.balanceOf(account);

      console.log('Balance of: ', balance.toString());
    }
  }

  async function setGreeting() {
    if (!greeting) return;

    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        greeterAddress,
        Greeting.abi,
        signer
      );

      const transaction = await contract.setGreeting(greeting);

      setGreetingValue('');

      await transaction.wait();

      fetchGreeting();
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);

      const transaction = await contract.transfer(userAccount, ammount);

      await transaction.wait();

      console.log(`${ammount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>

        <button onClick={setGreeting}>Set Greeting</button>

        <input
          type="text"
          value={greeting}
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set greeting"
        />

        <br />

        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(e) => setAmmount(e.target.value)}
          placeholder="Amount"
        />
      </header>
    </div>
  );
}

export default App;
