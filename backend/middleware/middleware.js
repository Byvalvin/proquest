
//MIDDLEWARE: has access to req,res and can do anything (like auth) with them
/* general format: const mwfunctname = (req,res,next) =>{}, next is the next middleware funct to be called
MW run on 1 route: PASS MW FUNCT NAMES as the third arg in the api funct to have them run when those routes are entered
e.g: server.get(route string, MW functname, (req,res)=>{});
Mw run on all routes: Sep middleware folder abd made a .js for the funct(s) and EXPORT THEM and import them in main (index.js) file then finally in There: server.use(MW functname);
*/

import { mongo } from "mongoose";


// log user/browser/client http requests
const requestLogger = (request, response, next) =>{
    // console.log(`REQUEST IS ${request}`);
    // console.log(`RESPONSE IS ${response}`);
    // console.log(`NEXT MW IS ${next}`);
    // next(); // need to call next mw funct at end
    const httpRequestMethod = request.method;
    const httpRequestURL = `${request.protocol}://${request.hostname}${request.originalUrl}`;

    let requestLog = `${httpRequestMethod} ${httpRequestURL}`;
    // log with colour
    // const ANSImap = {
    //     open:'\x1b[',
    //     reset:'\x1b[0m',
    //     close:'m',
    //     black:'30',red:'31',green:'32',yellow:'33',blue:'34',magenta:'35',cyan:'36',white:'37',
    // }
    // const requestColourMap = {GET:'green', POST:'yellow', PUT:'blue', DELETE:'red',}

    switch (httpRequestMethod) { // can use ANSI escape coding like this OR  a colour mapping
        case 'GET':
            console.log('\x1b[32m%s\x1b[0m', requestLog); // Green color for GET requests
            break;
        case 'POST':
            console.log('\x1b[33m%s\x1b[0m', requestLog); // Yellow color for POST requests
            break;
        case 'PUT':
            console.log('\x1b[34m%s\x1b[0m', requestLog); // Blue color for PUT requests
            break;
        case 'DELETE':
            console.log('\x1b[31m%s\x1b[0m', requestLog); // Red color for DELETE requests
            break;
        default:
            console.log(requestLog); // Default logging
            break;
    }
    
    next(); 
};

// custom error handler
const errorHandler = (error, request, response, next) =>{
    if(error.name === 'CastError' && error.kind==='ObjectId'){ //specific mongoDB error
        error.status = 404;
        error.message = 'Resource not found in DB'
    }
    response.status(error.status && error.status!==200 ? error.status : 500).json({msg:error.message, stack:process.env.NODE_ENV==='development backend' ? null:error.stack});
}

// custom function to catch all not-existent api endpoints
const notFoundHandler = (request, response, next) =>{
    const URL = `${request.protocol}://${request.hostname}${request.originalUrl}`;
    const endpointNotFoundError = new Error(`Endpoint ${URL} was not found`);
    endpointNotFoundError.status = 404;
    return next(endpointNotFoundError);
}

export {requestLogger, errorHandler, notFoundHandler};