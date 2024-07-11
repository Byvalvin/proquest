import express from "express";
// const express = require("express");


import { getPlayers, getPlayer, addPlayer, updatePlayer, deletePlayer } from "../controllers/playerController.js";


const router = express.Router();



/* 
format is server.method(apiURL, (request, response, next)=>{}); if directly using server
but router.method(apiURL, (request, response, next)=>{}); if using router
can also abstract away the method into another folder, export them from that folder and import them here
*/

// get all players
router.get('/', getPlayers);

// get player by id
router.get('/:id', getPlayer);

// add player
router.post('/', addPlayer);

// update player by id
router.put('/:id', updatePlayer);

// delete player by id
router.delete('/:id', deletePlayer);



// module.exports = router;
export default router;
