import express from 'express';
import { getNationalities } from '../controllers/nationalityController.js';

const router = express.Router();



router.get('/',getNationalities)

export default router;