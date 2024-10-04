import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); 

const exp_app = express();
const PORT = 5000;      // using port 5000 for listening incoming http requests

exp_app.use(cors());    // we use cors to facilitate frontend to access backend
exp_app.use(express.json());

const uri ='mongodb://localhost:27017';     // mongodb url
const mongoObj = new MongoClient(uri);

// this function helps to establish connection with mongodb
async function connectDB() {
  try { 
    await mongoObj.connect();   // sending a connection request to mongodb
    console.log('Connected to MongoDB Database');
  } catch (error) {
    // if connection failed then throw an error message
    console.error('Error Occured. Please Try again!!:', error);
    process.exit(1); 
  }
}

connectDB();

// making a get request to get all the players data
exp_app.get('/players', async (req, res) => {
  try {
    const db = mongoObj.db('TeamsDB');  // connecting to the teamsDB database in mongodb
    const teamsCollection = db.teamsCollection('TeamsCollection');  // the players data is present in the collection named 'TeamCollection'
    const players_json = await teamsCollection.find({}).toArray();
    res.json(players_json);
  } catch (error) {
    console.error('Error fetching players data try again!!', error);
    res.status(500).send('Error fetching players data try again!!');
  }
});

// making a post request to add a player to database
exp_app.post('/players', async (req, res) => {
  const { name, role, age, style, battingAvg } = req.body;

  // performing input validation
  if (!name || !role || !age || !style || !battingAvg) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const db = mongoObj.db('TeamsDB');
    const teamsCollection = db.teamsCollection('TeamsCollection');

    const newPlayer = {
      name,
      role,
      age,
      style,
      battingAvg,
    };

    const response_dat = await teamsCollection.insertOne(newPlayer);
    res.status(201).json(response_dat.ops[0]); 
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).send('Error creating player');
  }
});


// we are listening the incoming request to this server on port 5000
exp_app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
