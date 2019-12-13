import React from 'react';
import './App.css';
import Button from './components/Button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Burger Queen
      </header>
      <div className="ok">
        <Button handleclick={() => console.log('oi')} title='Cozinha' className='login-btn'/>
        <Button handleclick={() => console.log('oi')} title='Salão' className='login-btn'/>
      </div>
    </div>
  );
}

export default App;
