import express from "express";


import { getFormations, addFormation, deleteFormation } from "../controllers/formationController.js";

const router = express.Router();



// get all formations
router.get('/', getFormations);

// add formation
router.post('/', addFormation);

// delete formation by name
router.delete('/:name', deleteFormation); //will use the request body to delete


export default router;
