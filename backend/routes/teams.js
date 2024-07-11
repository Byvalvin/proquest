import express from "express";
import { getTeams, getTeam, addTeam, updateTeam, deleteTeam } from "../controllers/teamController.js";

const router = express.Router();


// get all teams
router.get('/', getTeams);

// get a team
router.get('/:id', getTeam);

// add a team
router.post('/', addTeam);

// update a team
router.put('/:id', updateTeam);

// delete a team
router.delete('/:id', deleteTeam);


export default router;
