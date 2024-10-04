import React from 'react';

const PlayersData = ({ players }) => {
    return (
        <div>
            {/*using map to add player to database */}
            {players.map(player => (
                <div key={player._id} className="player-card"> {/*using the player-card class properties for styling */}
                {/*Displaying each player information by parsing the json */}
                    <h3>{player.name}</h3>
                    <p><strong>Role:</strong> {player.role}</p>
                    <p><strong>Age:</strong> {player.age}</p>
                    <p><strong>Style:</strong> {player.style}</p>
                    <p><strong>Batting Avg:</strong> {player.battingAvg}</p>
                </div>
            ))}
        </div>
    );
};

export default PlayersData;
