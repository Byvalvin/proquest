// backend/index.js


// const express = require('express');
// const mongoose = require('mongoose');
// const players = require('./routes/players')
import express from "express"
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import players from "./routes/players.js";
import teams from "./routes/teams.js"
import formations from "./routes/formations.js";
import nationalities from "./routes/nationalities.js";
import {requestLogger, errorHandler, notFoundHandler} from "./middleware/middleware.js";
import cors from 'cors'; // Import CORS middleware

// CONNCET TO DB
connectDB();

// INIT SERVER with a port
const port = process.env.PORT || 8000; // get or set port
const server = express(); // init server object


//MIDDLEWARE:

// CORS middleware configuration
server.use(cors({
    origin: [ // Allow requests from this origin
        'http://localhost:4000',
        'https://elegant-kelpie-3d75ed.netlify.app',
    ], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

// Middleware for Request Body parser(for post,put..etc requests) 
server.use(express.json()); // user can post json data
server.use(express.urlencoded({extended:false})); // user can post xxx-form-urlencoded data

// Middleware for request logger
server.use(requestLogger);

// Middleware for ROUTES(players api middleware)
server.use('/api/players',players);
server.use('/api/teams', teams);
server.use('/api/nationalities', nationalities);
server.use('/api/formations', formations);

// Middleware for endpoints that dont exist in API: MUST BE RIGHT AFTER ROUTES SO NON-EXTANT ROUTES ARE CAUGHT HERE
server.use(notFoundHandler);

// Middleware for custom error handling: MUST BE BELOW ROUTES TO PREVENT CONFLICTS
server.use(errorHandler)



// START SERVER on a port
server.listen(port, ()=>console.log(`Server running on port ${port}`)); 
