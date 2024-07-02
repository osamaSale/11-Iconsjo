import React from 'react';
import './App.css';
import { ListAllPeople } from './components/ListAllPeople';

function App() {
  return (
    <div className="App">
      <div className='d-flex justify-content-center py-4'>
        <h3> List Of All People</h3>
      </div>
      <ListAllPeople />
    </div>
  );
}

export default App;
