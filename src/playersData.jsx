import React, { useState, useEffect } from "react";
// used prettier for beautify the code
const PlayersData = () => {

    const [playerData, setplayerData] = useState([]);   // to store data fetched from the api/mongodb database
    const [indPlayerData, setIndPlayerData] = useState(''); // to keep track of the selected player from drop down menu
    const [errorMsg, setErrorMsg] = useState(null); // to handle errors

    useEffect(() => {
        fetchPlayers();
    }, []);

    // I have created this function to fetched all the players data
    const fetchPlayers = async () => {
        setErrorMsg(null);
        try {
            const mongoresponse = await fetch('http://localhost:5000/players');     // fetching all the players data
            if (!mongoresponse.ok) {
                throw new Error('unable to connect to Database. Please try again!!');
            }
            const data = await mongoresponse.json();    // parsing the response as json
            console.log("Fetched players data:", data);  
            setplayerData(data);    // assigning players data to PlayerData
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    // Handle dropdown selection change
    const newPlayerReq = (event) => {
        const playerName = event.target.value;
        setIndPlayerData(playerName);   // setting the Individual players to the selected player
    };

    return (
        <div>
            <h1>Players Data</h1>
            {errorMsg && <p className="errormessage">{errorMsg}</p>}

            {/* this is the dropdown menu for selecting individual players */}
            <select value={indPlayerData} onChange={newPlayerReq}>
                <option value="">Select a player</option>
                <option value="all">All Players</option>
                {playerData.map(player => (
                    <option key={player._id} value={player.name}>
                        {player.name}
                    </option>
                ))}
            </select>

            {/* this is used for displaying individual player details or all players details at once */}
            {indPlayerData === 'all' ? (
                <div>
                    {playerData.map(player => (
                        <div key={player._id} className="player-card">
                            {/*extracting data from the json returned from database for all the players*/}
                            <h3>{player.name}</h3>
                            <p><strong>Role:</strong> {player.role}</p>
                            <p><strong>Age:</strong> {player.age}</p>
                            <p><strong>Style:</strong> {player.style}</p>
                            <p><strong>Batting Avg:</strong> {player.battingAvg}</p>
                        </div>
                    ))}
                </div>
            ) : (
                indPlayerData && playerData
                    .filter(player => player.name === indPlayerData)
                    .map(player => (
                        <div key={player._id} className="player-card">
                             {/*extracting data and displaying from the json returned from database for individual player */}
                            <h3>{player.name}</h3>
                            <p><strong>Role:</strong> {player.role}</p>
                            <p><strong>Age:</strong> {player.age}</p>
                            <p><strong>Style:</strong> {player.style}</p>
                            <p><strong>Batting Avg:</strong> {player.battingAvg}</p>
                        </div>
                    ))
            )}
        </div>
    );
};

export default PlayersData;
