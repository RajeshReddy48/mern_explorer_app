import React from 'react';

// using a fixed navigation bar to traverse across various components in the app 
function NavBar({ onShowVerse, onShowPlayersData, onShowPokemonData }) {
  return (
    <nav className='navbar'>
        {/*The Navigation bar has items : Bible Verse, Players Data, Pokemon data */}
      <ul>
        <li onClick={onShowVerse}>Bible Verse</li>
        <li onClick={onShowPlayersData}>Players Api</li>
        <li onClick={onShowPokemonData}>Pokemon Api</li>
      </ul>
    </nav>
  );
}

export default NavBar;
