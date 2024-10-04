// PokemonData.js
import React, { useState } from 'react';

function PokemonData() {
  const [pokemonNum, setPokemonNum] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // we use readPokemon function to scan the pokemonID or number from the input field
  const readPokemon = (e) => {
    setPokemonNum(e.target.value);
  };

  // get pokemon function trigger pokemon api and retrieve the pokemon information
  const getPokemon = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      // sending a GET request for pokemon api
      const pokemonresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNum}`);
      if (!pokemonresponse.ok) throw new Error('Pokemon not found');
      const data = await pokemonresponse.json(); // parsing the output from pokemon api as json
      setPokemon(data);
    } catch (err) {
      // setting error message incase of error message
      setErrorMsg(err.message);
      setPokemon(null);
    }
  };

  return (
    <div>
      {/*Input field to scan pokemonID/number  from the user */}
      <h1>Pokemon API</h1>
      <form onSubmit={getPokemon}>
        <input
          type="number"
          value={pokemonNum}
          onChange={readPokemon}
          placeholder="Enter Pokemon Value"
          min="1"
        />
        <button type="submit">Submit</button>
      </form>
      {errorMsg && <p className='errormessage'>{errorMsg}</p>}
      {pokemon && (
        <div>
          {/*extracting the pokemon data from the returned json */}
          <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
}

export default PokemonData;
