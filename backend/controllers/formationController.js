import asyncHandler from 'express-async-handler';
import Formation from '../models/formationModel.js';


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
const getFormations = asyncHandler(async(request,response, next) => {

    try {
        response.status(200).json({msg:"Sucess", data: await Formation.find()})
        // next() // no need to call next() once a response is sent with (.send,.json...) because its the end of the handling request sequence
        
    } catch (error) {
        next(error)
    }
})



const addFormation = asyncHandler(async(request,response, next) => {
    // check post data
   // console.log(request.body)
    const {name, defenseLines, midfieldLines, attackLines, goalkeeperLine} = request.body
    const formation = {name, defenseLines, midfieldLines, attackLines, goalkeeperLine}
    
    if(!formation.name){
      const error = badRequestError("Failure: Formation needs a name");
      return next(error); //MUIST CALL NEXT OR THE WHOLE CHAIN STOPS AND REQUEST IS NEVER FULFILLED
    }
    if(!formation.goalkeeperLine){
      const error = badRequestError("Failure: Formation has no goalkeeper");
      return next(error);
    }
    if(!formation.defenseLines){
      const error = badRequestError("Failure: Formation has no defense");
      return next(error);
    }
    if(!formation.midfieldLines){
        const error = badRequestError("Failure: Formation has no midfield");
        return next(error);
    }
    if(!formation.attackLines){
    const error = badRequestError("Failure: Formation has no attack");
    return next(error);
    }

    
    try {
        const formationExists = await Formation.findOne({ name }); // 7 E -10 chance of truly having the same of these
        if(formationExists){
            return next(badRequestError("Failure: Formation already exists"));
        }

        console.log(formation);
        const newFormation = await Formation.create(formation)
        if(newFormation){
            response.status(201).json({name:formation.name, data: await Formation.find()})
        }else{
            return next(badRequestError("Invalid Formation data"));
        }
        
    } catch (error) {
        next(error)
    }
});



const deleteFormation = asyncHandler(async(request,response, next) => {
    const name = request.params.name

    try {
        // Find and delete the formation by name
        const formationToDelete = await Formation.findOneAndDelete({ name: name })
        if(!formationToDelete){
            const error = notFoundError(`Failure: Formation with name ${name} was not found`);
            return next(error);
        }
        console.log("f",await Formation.find())
        response.status(204).json({msg:"Success", data: await Formation.find()})  
            
    } catch (error) {
        next(error)
    }
})

export { getFormations, addFormation, deleteFormation }