import express from "express";

import { 
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} from "../../controllers/contact";
import {
    validateEmail,
    validateName
  } from '../../middlewares/validation';

const routes = express.Router();

routes.get('/', getContacts);

routes.get('/:name', getContact);

routes.post('/', createContact);

routes.put('/:name', validateName, updateContact);

routes.delete('/:name', deleteContact);

export default routes;
