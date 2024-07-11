import path from "path"
import { fileURLToPath } from "url";
import fs from 'fs';

import asyncHandler from 'express-async-handler';



// Read and parse JSON file synchronously
//get dir name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// console.log(__dirname)
const DATA_FILE = 'db.json'; // Name of your JSON file
const filePath = path.join(__dirname, DATA_FILE);
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));



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
// @desc get all nationalities
// router GET /api/nationalities
// @access Public

const getNationalities = asyncHandler(async(request, response, next)=>{
    response.status(200).json({msg:'Success', data:data.nationalities})
})

export {getNationalities}