import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';


dotenv.config({path: './.env'});


const MONGODB_URI = process.env.MONGODB_URI;


if(!MONGODB_URI){
    throw new Error('Error connecting to Mongo via .env.local');
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: null, promise: null};
}

async function connectToDatabase(){

    const client = new MongoClient(MONGODB_URI);
    
    await client.connect();

    await client.db("admin").command({ ping: 1 });
        
    return client;
}

export default connectToDatabase;