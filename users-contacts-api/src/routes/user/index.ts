import express from "express";

import { 
    getAllUsers,
    getUserById,
    createUser,
    getUserByName,
    deleteUserById,
    updateUserById 
} from "../../controllers/users";
import {
    isUser,
    validateEmail,
    validateName,
  } from '../../middlewares/validation';

const routes = express.Router();

routes.get('/', getAllUsers);

routes.get('/search', getUserByName);

routes.get('/:id', isUser, getUserById);

routes.post('/add-user', validateEmail, validateName, createUser);

routes.put('/:id', isUser, validateName, updateUserById);

routes.delete('/:id', isUser, deleteUserById);

export default routes;
