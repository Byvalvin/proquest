import mongoose from "mongoose";

const DOBSchema = mongoose.Schema( // subdocument
    {
        year:{type:Number},
        month:{type:Number},
        day:{type:Number}
    },
    { _id: false } // no _id should be added to sub docs
);

const playerSchema = mongoose.Schema(
    {
        first:{type:String, required:true},
        last:{type:String, required:true},
        age:{type:String, required:true},
        DOB:{type:DOBSchema},
        nationality:{type:String, required:true},
        footedness:{type:Number, required:true},
        position:{
            preferred:{type:[String], required:true},
            other:{type:[String], default:[]}
        },
        overall:{type:Number, required:true},
        estValue:{type:Number, default:1},
        team:{type:String, default:""},
        specialities:{type:[String], default:[]},
        weaknesses:{type:[String], default:[]},
        description:{type:String, default:""},
        review:{type:String, default:""},
        views:{type:Number, default:0},
        gender:{type:Number, default:1},
        star:{type:Boolean, default:false}
        
    },
    {
        collection: 'Players', // Specify the collection name here
        timestamps:true
    }
);

const Player = mongoose.model('Player', playerSchema);

export default Player;