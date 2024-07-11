// backend/index.js


// const express = require('express');
// const mongoose = require('mongoose');
// const players = require('./routes/players')
import express from "express"
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import players from "./routes/players.js";
import teams from "./routes/teams.js"
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
        'https://elegant-kelpie-3d75ed.netlify.app/',
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

// Middleware for endpoints that dont exist in API: MUST BE RIGHT AFTER ROUTES SO NON-EXTANT ROUTES ARE CAUGHT HERE
server.use(notFoundHandler);

// Middleware for custom error handling: MUST BE BELOW ROUTES TO PREVENT CONFLICTS
server.use(errorHandler)



// START SERVER on a port
server.listen(port, ()=>console.log(`Server running on port ${port}`)); 





/*
{
  "players": [
    {
      "id": "1",
      "first": "D",
      "last": "A",
      "DOB": {
        "year": 2001,
        "month": "Jan",
        "day": 11
      },
      "age": 23,
      "nationality": "NIG",
      "location": "CAN",
      "team": "star United F.C.",
      "estValue": 1000,
      "footedness": 1,
      "position": {
        "preferred": [
          "CAM",
          "CF",
          "CM",
          "RW",
          "LW"
        ],
        "other": [
          "CDM",
          "RM",
          "LM",
          "LB",
          "RB"
        ]
      },
      "specialities": [
        "dribbler",
        "long shots",
        "finesse",
        "vision",
        "weak foot"
      ],
      "weaknesses": [
        "mentality",
        "decision making",
        "fear",
        "stamina",
        "finishing",
        "shot power",
        "ferocity"
      ],
      "description": "A fine player. Much too work on",
      "views": 7,
      "overall": 90.1,
      "star": false
    },
    {
      "id": "2",
      "first": "Tio",
      "last": "Akin",
      "DOB": {
        "year": 2003,
        "month": "Jun",
        "day": 23
      },
      "age": 21,
      "nationality": "NIG",
      "location": "CAN",
      "team": "star United F.C.",
      "estValue": 600,
      "footedness": 1,
      "position": {
        "preferred": [
          "ST",
          "CF",
          "RW",
          "LW"
        ],
        "other": [
          "CDM",
          "CB",
          "LB",
          "RB"
        ]
      },
      "specialities": [
        "leader of men",
        "dribblier",
        "versatile",
        "speed",
        "strength"
      ],
      "weaknesses": [
        "stamina",
        "finishing",
        "ball control"
      ],
      "description": "A solid player.",
      "views": 9,
      "overall": 84.7,
      "star": false
    },
    {
      "id": "3",
      "first": "Brayden",
      "last": "A",
      "DOB": {
        "year": 2003,
        "month": "Jul",
        "day": 13
      },
      "age": 21,
      "nationality": "CAN",
      "location": "CAN",
      "team": "star United F.C.",
      "estValue": 1100,
      "footedness": 1,
      "position": {
        "preferred": [
          "ST",
          "LW",
          "CF",
          "RW",
          "CAM"
        ],
        "other": [
          "LM",
          "RM",
          "CM"
        ]
      },
      "specialities": [
        "goal scorer",
        "shot power",
        "finishing",
        "speed",
        "ferocity"
      ],
      "weaknesses": [
        "work rate",
        "injury prone",
        "stamina"
      ],
      "description": "Attacker, through and through",
      "views": 17,
      "overall": 92.1,
      "star": true
    },
    {
      "id": "4",
      "first": "Elias",
      "last": "M",
      "DOB": {
        "year": 2001,
        "month": "Apr",
        "day": 11
      },
      "age": 23,
      "nationality": "CON",
      "location": "CAN",
      "team": "star United F.C.",
      "estValue": 950,
      "footedness": 1,
      "position": {
        "preferred": [
          "CM",
          "CDM",
          "RM",
          "LM"
        ],
        "other": [
          "CB",
          "LB",
          "RB"
        ]
      },
      "specialities": [
        "controller",
        "ball control",
        "dribbler",
        "passing",
        "speed",
        "strength"
      ],
      "weaknesses": [
        "vision"
      ],
      "description": "A game changer.",
      "views": 11,
      "overall": 89.3,
      "star": false
    },
    {
      "id": "b0d4",
      "first": "New",
      "last": "PLayer",
      "DOB": {
        "year": "",
        "month": "",
        "day": ""
      },
      "age": "18",
      "nationality": "CAN",
      "location": "",
      "team": "Elite FC",
      "estValue": 1,
      "footedness": 0,
      "position": {
        "preferred": [
          "RM",
          " CM"
        ],
        "other": [
          "CDM"
        ]
      },
      "specialities": [
        "Dead-ball specialist",
        " goal scorer"
      ],
      "weaknesses": [
        "stamina",
        " speed"
      ],
      "description": "An odd player",
      "views": 0,
      "overall": 50,
      "star": false
    },
    {
      "id": "ec7d",
      "first": "NewER",
      "last": "PLayer",
      "DOB": {
        "year": "",
        "month": "",
        "day": ""
      },
      "age": "18",
      "nationality": "IND",
      "location": "",
      "team": "Amigos FC",
      "estValue": 1,
      "footedness": 1,
      "position": {
        "preferred": [
          "RM",
          " CM",
          " ST"
        ],
        "other": [
          "CDM",
          " CAM"
        ]
      },
      "specialities": [
        "Dead-ball specialist",
        " goal scorer",
        " maestro"
      ],
      "weaknesses": [
        "stamina",
        " speed",
        " strength"
      ],
      "description": "An odder player",
      "views": 0,
      "overall": 50,
      "star": false
    },
    {
      "id": "c115",
      "first": "NEWWEST",
      "last": "PLAYER",
      "DOB": {
        "year": "",
        "month": "",
        "day": ""
      },
      "age": "25",
      "nationality": "LEB",
      "location": "",
      "team": "Elite FC",
      "estValue": 1,
      "footedness": 0,
      "position": {
        "preferred": [
          "LW",
          " ST",
          " CF"
        ],
        "other": [
          "GK"
        ]
      },
      "specialities": [
        "Playmaker",
        " shooter"
      ],
      "weaknesses": [
        "passing"
      ],
      "description": "",
      "views": 0,
      "overall": 50,
      "star": false
    },
    {
      "id": "014b",
      "first": "hdf",
      "last": "hdhdf",
      "DOB": {
        "year": "",
        "month": "",
        "day": ""
      },
      "age": "67",
      "nationality": "RUS",
      "location": "",
      "team": "WWB FC",
      "estValue": 1,
      "footedness": 0,
      "position": {
        "preferred": [
          "CAM"
        ],
        "other": [
          "GK"
        ]
      },
      "specialities": [
        "dribbler",
        " passer"
      ],
      "weaknesses": [
        "aggression"
      ],
      "description": "",
      "views": 0,
      "overall": 50,
      "star": false
    },
    {
      "id": "3992",
      "first": "ruslan",
      "last": "ford",
      "DOB": {
        "year": "",
        "month": "",
        "day": ""
      },
      "age": "26",
      "nationality": "USA",
      "location": "",
      "team": "Force FC",
      "estValue": 1,
      "footedness": 1,
      "position": {
        "preferred": [
          "ST",
          " CB",
          " CDM"
        ],
        "other": [
          "GK",
          " CM"
        ]
      },
      "specialities": [
        "Dead-ball specialist",
        " versatile"
      ],
      "weaknesses": [
        "passing"
      ],
      "description": "",
      "views": 0,
      "overall": 50,
      "star": false
    },
    {
      "id": "2e16",
      "first": "Danny",
      "last": "R",
      "DOB": {
        "year": "",
        "month": "",
        "day": ""
      },
      "age": "18",
      "nationality": "NIG",
      "location": "",
      "team": "Fobs FC",
      "estValue": 1,
      "footedness": 1,
      "position": {
        "preferred": [
          "LM",
          " RM"
        ],
        "other": [
          "CM"
        ]
      },
      "specialities": [
        "Speed",
        " Aggression"
      ],
      "weaknesses": [
        "Ball control",
        " Dribbling",
        " FInishing"
      ],
      "description": "",
      "views": 0,
      "overall": "62",
      "star": false
    },
    {
      "id": "29ad",
      "first": "Omar",
      "last": "A",
      "DOB": {
        "year": "",
        "month": "",
        "day": ""
      },
      "age": "21",
      "nationality": "LEB",
      "location": "",
      "team": "Fobs FC",
      "estValue": 1,
      "footedness": 1,
      "position": {
        "preferred": [
          "LM",
          "LW",
          " RW",
          " CM",
          " ST"
        ],
        "other": [
          "LM",
          " RM",
          " CDM"
        ]
      },
      "specialities": [
        "Weak Foot",
        " Shooting",
        " Team Player"
      ],
      "weaknesses": [
        "Speed",
        " Stamina"
      ],
      "description": "",
      "views": 0,
      "overall": "67",
      "star": false
    },
    {
      "first": "Karthik",
      "last": "V",
      "DOB": {
        "year": "",
        "month": "",
        "day": ""
      },
      "age": "20",
      "nationality": "IND",
      "location": "",
      "team": "Fobs FC",
      "estValue": "850",
      "footedness": 1,
      "position": {
        "preferred": [
          "LM",
          "RM",
          "     LW",
          "     RW"
        ],
        "other": [
          "CAM",
          "     CM",
          "     LB",
          "     RB"
        ]
      },
      "specialities": [
        "Composure",
        "     shooting",
        "     team player",
        "     dribbling"
      ],
      "weaknesses": [
        "speed",
        "     consistency"
      ],
      "description": "A great one on his day",
      "views": 0,
      "overall": "74",
      "star": false,
      "id": "7321"
    },
    {
      "first": "Catelyn",
      "last": "K",
      "DOB": {
        "year": "",
        "month": "",
        "day": ""
      },
      "age": "21",
      "nationality": "CAN",
      "location": "",
      "team": "Elite FC",
      "estValue": "1600",
      "footedness": 0,
      "position": {
        "preferred": [
          "LB",
          "LWB",
          "   CB",
          "   LM"
        ],
        "other": [
          "LW",
          "   CM",
          "   CDM"
        ]
      },
      "specialities": [
        "Composure",
        "   Passing"
      ],
      "weaknesses": [
        "Aerial Battles",
        "   Weak Foot"
      ],
      "description": "A solid player",
      "views": 0,
      "overall": "79",
      "star": true,
      "id": "06da"
    },
    {
      "first": "Stefan",
      "last": "D",
      "DOB": {
        "year": "",
        "month": "",
        "day": ""
      },
      "age": "21",
      "nationality": "CNG",
      "location": "",
      "team": "Elite FC",
      "estValue": "1900",
      "footedness": 1,
      "position": {
        "preferred": [
          "RM",
          "RB",
          "  LB",
          "  CM",
          "  CDM",
          "  RWB"
        ],
        "other": [
          "CB",
          "  LM",
          "  RW"
        ]
      },
      "specialities": [
        "Speed",
        "  Strength",
        "  Aggression",
        "  Jumping"
      ],
      "weaknesses": [],
      "description": "",
      "views": 0,
      "overall": "87",
      "star": false,
      "id": "b136"
    },
    {
      "first": "Lucas",
      "last": "L",
      "DOB": {
        "year": "",
        "month": "",
        "day": ""
      },
      "age": "21",
      "nationality": "CAN",
      "location": "",
      "team": "Elite FC",
      "estValue": "1199",
      "footedness": 1,
      "position": {
        "preferred": [
          "CAM",
          "CDM",
          "   CM",
          "   ST"
        ],
        "other": [
          "GK",
          "   CB"
        ]
      },
      "specialities": [
        "Well-rounded",
        "   Reflexes",
        "   Shot-stopper",
        "   Versatile",
        "   Consistency"
      ],
      "weaknesses": [
        "Ball control"
      ],
      "description": "A well rounded player. Can excel anywhere on the pitch.",
      "views": 0,
      "overall": "82",
      "star": false,
      "id": "9e0c"
    },
    {
      "first": "Adetayo",
      "last": "A",
      "DOB": {
        "year": "",
        "month": "",
        "day": ""
      },
      "age": "21",
      "nationality": "NIG",
      "location": "",
      "team": "Elite FC",
      "estValue": "1100",
      "footedness": 1,
      "position": {
        "preferred": [
          "LW",
          "CF",
          "  RW",
          "  CAM",
          "  LM"
        ],
        "other": [
          "RM",
          "  CDM"
        ]
      },
      "specialities": [
        "Speed",
        "  Dribbling",
        "  Flair",
        "  Strength"
      ],
      "weaknesses": [
        "Vision"
      ],
      "description": "",
      "views": 0,
      "overall": "88",
      "star": false,
      "id": "baec"
    }
  ],
  "teams": [
    {
      "name": "Fobs FC",
      "rating": 78,
      "year": 1978,
      "value": 10000,
      "id": "8503"
    },
    {
      "name": "Elite FC",
      "rating": 67,
      "year": 1978,
      "value": 10000,
      "id": "7d05"
    },
    {
      "name": "Force FC",
      "rating": 71,
      "year": 1978,
      "value": 10000,
      "id": "1f3a"
    },
    {
      "name": "Amigos FC",
      "rating": 82,
      "year": 1978,
      "value": 10000,
      "id": "8809"
    },
    {
      "name": "WWB FC",
      "rating": 74,
      "year": 1978,
      "value": 10000,
      "id": "d858"
    }
  ],
  "nationalities": [
    {
      "abbr": "NIG",
      "full": "Nigeria",
      "id": "df3d"
    },
    {
      "abbr": "CAN",
      "full": "Canada",
      "id": "428d"
    },
    {
      "abbr": "USA",
      "full": "United States",
      "id": "41b1"
    },
    {
      "abbr": "CNG",
      "full": "Congo",
      "id": "9405"
    },
    {
      "abbr": "IND",
      "full": "India",
      "id": "6110"
    },
    {
      "abbr": "RUS",
      "full": "Russia",
      "id": "5823"
    },
    {
      "abbr": "LEB",
      "full": "Lebanon",
      "id": "1e2b"
    },
    {
      "abbr": "SKR",
      "full": "South Korea",
      "id": "ac7d"
    }
  ]
}
*/
