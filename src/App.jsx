
import { useState } from 'react';
import './App.css';
import RandomVerseComp from './getVerse'; 

function App() {
  return (
    <div className='app-container'>
      <h1>Bible Verses</h1>
      <RandomVerseComp /> 
    </div>
  );
}

export default App;
