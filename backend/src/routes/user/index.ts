import express from "express";

import { 
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from "../../controllers/users";
import {
    isUser,
    validateEmail,
    validateName
  } from '../../middlewares/validation';

const routes = express.Router();

routes.get('/', getAllUsers);

routes.get('/:primaryEmail', getUser, isUser);

routes.post('/', validateEmail, validateName, createUser);

routes.put('/:primaryEmail', isUser, validateName, updateUser);

routes.delete('/:primaryEmail', isUser, deleteUser);

export default routes;
