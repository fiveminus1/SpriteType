import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
    word: String
});

export default mongoose.models.Word || mongoose.model('Word', wordschema);