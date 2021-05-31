import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApplicationContext, Context } from './context/Application.context';
import { Detector } from "react-detect-offline"
import { BuildChecker } from './checker';

function App() {
  const [online, setOnline] = useState(false)
  const initialContext: Context = {
    online: online,
    setOnline: setOnline
  }

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Trigger')
      setOnline(window.navigator.onLine);
    }, 1000)
    return () => clearInterval(timer);
  }, [online])
  const d = BuildChecker()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          {online ? 'Online' : 'Offline'}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <p>
            {d.c}
            {d.f() ? 'Si' : 'No'}
          </p>
        </a>
      </header>
      <ApplicationContext.Provider value={initialContext}>

      </ApplicationContext.Provider>
    </div>
  );
}

export default App;
