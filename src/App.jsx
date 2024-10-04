// App.jsx
import { useState } from 'react';
import './App.css';
import RandomVerseComp from './getVerse';
import PlayersData from './playersData';
import PokemonData from './pokemonData';
import NavBar from './NavBar'; 

function App() {
  const [view, setView] = useState('home');
// set view for Bible verse
  const setShowVerse = () => {
    setView('verse');
  };
//  set view for Players Api
  const setShowPlayersData = () => {
    setView('playersData');
  };
// set view for Pokemon Api
  const setShowPokemonData = () => {
    setView('pokemonData');
  };

  return (
    <div className='app-container'>
      {/*Navigation bar with items BibleVerse, Players Api, Pokemon APi */}
      <NavBar
        onShowVerse={setShowVerse}
        onShowPlayersData={setShowPlayersData}
        onShowPokemonData={setShowPokemonData}
      />
       {/*Home View*/}

      {view === 'home' ? (
        <div>
          <h1>HomePage</h1>
          <p>Welcome the Application. Please use the navigation bar to access the features</p>
        </div>
        // BibleVerse view
      ) : view === 'verse' ? (
        <RandomVerseComp />
         // playersApi View
      ) : view === 'playersData' ? (
        <PlayersData />
      ) : (
        <PokemonData />
      )}
    </div>
  );
}

export default App;
