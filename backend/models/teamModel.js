import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
    {
        name:{type:String, required:true},
        year:{type:Number, required:true},
        email:{type:String},
        roster:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
        rating:{type:Number, default:0},
        performance:{type:Number, default:0},
        baseValue:{type:Number, default:0},
        value:{type:Number, default:0},
        certified:{type:Boolean, default:false}

    },
    {
        collection: 'Teams', // Specify the collection name here
        timestamps:true
    }
);


// Method to calculate average rating and total value based on roster players
teamSchema.methods.calculateMetrics = async function() {
    const Player = mongoose.model('Player');

    // Retrieve all players in the roster and calculate rating and total value
    const players = await Player.find({ _id: { $in: this.roster } }).exec();

    if (players.length) {
        const totalOverall = players.reduce((sum, player) => sum + player.overall, 0);
        this.rating = totalOverall / players.length;

        const totalPlayerValue = players.reduce((sum, player) => sum + player.estValue, 0);
        this.value = this.baseValue + totalPlayerValue;
    }
};

// Middleware to update rating and value before saving a team document
teamSchema.pre('save', async function(next) {
    await this.calculateMetrics();
    next();
});

const Team = mongoose.model('Team', teamSchema);

export default Team;