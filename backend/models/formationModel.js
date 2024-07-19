import mongoose from "mongoose";

// Define position schema (assuming you already have this)
const positionSchema = mongoose.Schema({
    preferred: [{ type: String }],
    other: [{ type: String }]
});

// Define plannerPlayer schema
const plannerPlayerSchema = mongoose.Schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
    position: { type: positionSchema, required: true },
    gender: { type: Number, enum: [0, 1], required: true }, // 0 for male, 1 for female, 2 for other
    star: { type: Boolean, default: false },
    overall: { type: Number, required: true }
});

// Define formation schema
const formationSchema = mongoose.Schema(
    {
        _id: { type: String, default: "0" }, // Custom _id field
        name:{type:String, require:true, unique:true},
        defenseLines: [{
            players: [plannerPlayerSchema]
        }],
        midfieldLines: [{
            players: [plannerPlayerSchema]
        }],
        attackLines: [{
            players: [plannerPlayerSchema]
        }],
        goalkeeperLine: [{
            players: [plannerPlayerSchema]
        }]
    },
    { _id: false } // no _id should be added to sub docs
);

// Create and export Formation model
const Formation = mongoose.model('Formation', formationSchema);
export default Formation;
