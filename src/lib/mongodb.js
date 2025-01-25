import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';


dotenv.config({path: './.env'});


const MONGODB_URI = process.env.MONGODB_URI;


if(!MONGODB_URI){
    throw new Error('Error connecting to Mongo via .env.local');
}

let cached = global.mongo;

if(!cached){
    cached = global.mongo = { conn: null, promise: null};
}

async function connectToDatabase(){
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const client = new MongoClient(MONGODB_URI);
        
        cached.promise = client.connect().then(() => {
            return client.db('admin').command({ping:1}).then(()=>client);
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
    
}

export default connectToDatabase;