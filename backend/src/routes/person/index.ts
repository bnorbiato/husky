import express from "express";

import { 
    getPeople,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
} from "../../controllers/person";
import {
    isPerson,
    validateEmail,
    validateName
  } from '../../middlewares/validation';

const routes = express.Router();

routes.get('/', getPeople);

routes.get('/:email', getPerson, isPerson);

routes.post('/', validateEmail, validateName, createPerson);

routes.put('/:email', isPerson, validateName, updatePerson);

routes.delete('/:email', isPerson, deletePerson);

export default routes;
