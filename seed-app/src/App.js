import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as eth from './eth-secp256k1-hd';

function App() {
  const privateKey = eth.privateKey();

  return (
    <div className="App">
      <p>Private key:
        {eth.privateKey()}
      </p>
      <p>Public key:
        {eth.publicKey(privateKey)}
      </p>
    </div>
  );
}

export default App;
