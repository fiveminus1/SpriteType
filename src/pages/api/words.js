import connectToDatabase from "../../lib/mongodb";
import Word from "../../models/Word";

export default async function handler(req, res){
    await connectToDatabase();

    if(req.method === 'GET'){
        try{
            const words = await Word.find();
            res.status(200).json(words);
        } catch(error){
            res.status(500).json({error: 'Failed to fetch words'});
        } 
    }      
    else {
        res.status(405).json({error: 'Method not allowed'});
    }
}
