import React from 'react';
import { useWeb3React } from "@web3-react/core"

import { injected } from "../components/wallet/connector"
import './App.css';

const App = () => {
  const { active, account, library, connector, activate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', true)
    } catch (ex) {
      console.log(ex)
    }
  }

  React.useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          localStorage.setItem('isWalletConnected', true)
          await activate(injected)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [])


  return (
    <div className='app'>
      <button
        onClick={connect}
        className='button'>
        Connect
      </button>

      {active ?
        <p className='text'>{account}</p>
        :
        <p className='text'>Not connected</p>}
    </div>
  );
}

export default App;
