import asyncHandler from 'express-async-handler';
import Team from "../models/teamModel.js";


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
// @desc get all teams
// router GET /api/teams
// @access Public
const getTeams = asyncHandler(async(request, response, next)=>{
    try {
        const lim = parseInt(request.query.limit)
        response.status(200).json({msg:"Success",data:lim && isNaN(lim) && lim>0 ? await Team.find().limit(lim) : await Team.find()})
    } catch (error) {
        next(error)
    }
});

const getTeam = asyncHandler(async(request, response, next)=>{
    const ID = request.params.id
    try {
        const team = await Team.findById(ID)
        if(!team){
            return next(notFoundError(`Failure: Team with id ${ID} was not found`))
        }
        response.status(200).json({msg:"Success",data:team})
    } catch (error) {
        next(error)
    }
})

const addTeam = asyncHandler(async(request, response, next)=>{
    const { name, year, roster, rating, performance, baseValue, value } = request.body
    const team = { name, year, roster, rating, performance, baseValue, value }

    if(!name){
        return next(badRequestError("Failure: Team needs a name"))
    }
    if(!year){
        return next(badRequestError("Failure: Team needs a year"))
    }
    if(!baseValue){
        return next(badRequestError("Failure: Team needs a base value"))
    }

    try {
        const teamExists = await Team.findOne({name})
        if(teamExists){
            return next(badRequestError("Failure: Team already exists"))
        }
        console.log(team)

        const newTeam = await Team.create(team)
        if(!newTeam){
            return next(badRequestError("Failure: Invalid Team Data"))
        }
        response.status(201).json({msg:"Success", data:newTeam})
        
    } catch (error) {
        next(error)
    }
})


// update
const updateTeam = asyncHandler(async(request, response, next)=>{
    const ID = request.params.id
    try {
        const { name, year, roster, rating, performance, baseValue, value } = request.body
        const team = { name, year, roster, rating, performance, baseValue, value }

        const updatedTeam = await Team.findByIdAndUpdate(ID, team, {new:true} )
        if(!updatedTeam){
            return next(badRequestError(`Failure: Team with id ${ID} was not found`))
        }
        response.status(200).json({msg:"Success",data:updatedTeam})

    } catch (error) {
        next(error)
    }
})

// delete
const deleteTeam = asyncHandler(async(request, response, next)=>{
    const ID = request.params.id
    try {
        const teamToDelete = Team.findByIdAndDelete(ID)
        if(!teamToDelete){
            return next(badRequestError(`Failure: Team with id ${ID} was not found`)) 
        }
        response.status(204).json({msg:'Success', data:{}})      
    } catch (error) {
        next(error)
    }
})


export {getTeams, getTeam, addTeam, updateTeam, deleteTeam}