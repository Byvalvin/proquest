// import path from "path"
// import { fileURLToPath } from "url";
// import fs from 'fs';

import asyncHandler from 'express-async-handler';
import Player from "../models/playerModel.js";



// Read and parse JSON file synchronously
//get dir name
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// // console.log(__dirname)
// const DATA_FILE = 'db.json'; // Name of your JSON file
// const filePath = path.join(__dirname, DATA_FILE);
// let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));



// errors: set appropriate error status if its not a server problem
const badRequestError = (message) =>{
    const error = new Error(message);
    error.status = 400;
    return error;
}
const notFoundError = (message) =>{
    const error = new Error(message);
    error.status = 404;
    return error;
}

// api endpoint functions: MKAE THEM ALL ASYNC BECAUSE DB, use ASYNCHANDLER FOR SIMPLER ERROR HANDLES + CUSTOM ERROR HANDLERS
// @desc get all players
// router GET /api/players
// @access Public
const getPlayers = asyncHandler(async(request,response, next) => {
    // handle queries
    // inculde query MUST MAKE SURE WE GET WHAT WE WANT TO PREVENT ATTACKS
    const lim = parseInt(request.query.limit) // use isNan to check if it is a number or not

    try {
        response.status(200).json({msg:"Sucess", data: lim && !isNaN(lim) && lim>0 ? await Player.find().limit(lim) : await Player.find()})
        // next() // no need to call next() once a response is sent with (.send,.json...) because its the end of the handling request sequence
        
    } catch (error) {
        next(error)
    }
})

const getPlayer = asyncHandler(async(request,response, next) => { // include next as third arg to use custom middle including custom error handling
    const ID = request.params.id;
    //const player = data.players.find((player)=>player.id===ID);

    try {
        const player = await Player.findById(ID)
        if(!player){
            const error = notFoundError(`Failure: Player with id ${ID} was not found`);
            return next(error);
        }
        response.status(200).json({msg:"Success", data:player}); 
        
    } catch (error) {
        next(error)
    }
    
});


const addPlayer = asyncHandler(async(request,response, next) => {
    // check post data
    const {first,last,age,DOB,nationality,footedness,position,overall,estValue, team, specialities, weaknesses, description, review, views, star} = request.body
    const player = {first,last,age,DOB,nationality,footedness,position,overall,estValue, team, specialities, weaknesses, description, review, views, star}
    
    if(!player.first || !player.last){
      const error = badRequestError("Failure: Player needs a first and a last name");
      return next(error); //MUIST CALL NEXT OR THE WHOLE CHAIN STOPS AND REQUEST IS NEVER FULFILLED
    }
    if(!player.age){
      const error = badRequestError("Failure: Player needs an age");
      return next(error);
    }
    if(!player.nationality){
      const error = badRequestError("Failure: Player needs a nationality");
      return next(error);
    }
    if(![0,1].includes(player.footedness)){
      const error = badRequestError("Failure: Player needs footedness");
      return next(error);
    }
    if(!player.position || !player.position.preferred){
      const error = badRequestError("Failure: Player needs at least 1 position they can play");
      return next(error);
    }
    if(!player.overall){
      const error = badRequestError("Failure: Player needs an overall");
      return next(error);
    }
    
    // add valid post data, give them a unique id
    // const newID = data.players.length + 1
    // data.players.push({...player, id:newID.toString()})
    // response.status(201).json(data.players)


    try {
        const playerExists = await Player.findOne({ first, last, nationality, DOB, age }); // 7 E -10 chance of truly having the same of these
        if(playerExists){
            return next(badRequestError("Failure: Player already exists"));
        }

        console.log(player);
        const newPlayer = await Player.create(player)
        if(newPlayer){
            response.status(201).json({_id:newPlayer._id, name:`${newPlayer.first} ${newPlayer.last}`})
        }else{
            return next(badRequestError("Invalid Player data"));
        }
        
    } catch (error) {
        next(error)
    }
});

const updatePlayer = asyncHandler(async(request,response, next) => {
    const ID = request.params.id
    // const playerToUpdate = data.players.find((player)=>player.id===ID)
    // if(!playerToUpdate){
    //   const error = notFoundError(`Failure: Player with id ${ID} was not found`);
    //   return next(error);
    // }

    // save updates
    const {first,last,age,DOB,nationality,footedness,position,overall,estValue, team, specialities, weaknesses, description, review, views, star} = request.body
    const player = {first,last,age,DOB,nationality,footedness,position,overall,estValue, team, specialities, weaknesses, description, review, views, star}

    try {
        const updatedPlayer = await Player.findByIdAndUpdate(ID, player, {new:true})
        if(!updatedPlayer){
            const error = notFoundError(`Failure: Player with id ${ID} was not found`);
            return next(error); 
        }
        response.status(200).json({msg:"Success", data:updatedPlayer})
    } catch (error) {
        next(error)
    }
    
    // data.players = data.players.map((player)=>player.id===ID ? updatedPlayer : player)
    // response.status(200).json({msg:"Success", data:data.players.find((player)=>player.id===ID)})
})


const deletePlayer = asyncHandler(async(request,response, next) => {
    const ID = request.params.id
    //const playerToDelete = data.players.find((player)=>player.id===ID)
    try {
        const playerToDelete = await Player.findByIdAndDelete(ID)
        if(!playerToDelete){
            const error = notFoundError(`Failure: Player with id ${ID} was not found`);
            return next(error);
        }
        // data.players = data.players.filter((player)=>player.id!==ID)
        // response.status(204).json({msg:"Success", data:data.players})  
        response.status(204).json({msg:"Success", data:{msg:"Success"}})  
            
    } catch (error) {
        next(error)
    }
})

export { getPlayers, getPlayer, addPlayer, updatePlayer, deletePlayer }



/*
{
        "first":"Graham",
        "last":"Burke",
        "age":28,
        "DOB":{"year":1996,"month":7,"day":16},
        "nationality":{"abbr":"IRL", "full":"Ireland"},
        "footedness":0,
        "position":{
            "preferred":["CF","ST"],
            "other":["RW","LW"]
        },
        "overall":85    
    }
*/