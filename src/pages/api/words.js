import connectToDatabase from "../../lib/mongodb";

export default async function handler(req, res){
    const client = await connectToDatabase();
    const db = client.db('typing-test');
    const collection = db.collection('words');
    console.log("CONNECTED")

    if(req.method === 'GET'){
        try{
            const { limit = 10 } = req.query;

            const words = await collection.aggregate([
                { $sample: { size: parseInt(limit)}}
            ]).toArray();
            res.status(200).json(words);
        } catch(error){
            res.status(500).json({error: 'Failed to fetch words'});
        } 
    }      
    else {
        res.status(405).json({error: 'Method not allowed'});
    }
}
