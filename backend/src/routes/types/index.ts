import express from "express";

import { 
    getTypes,
    createType,
} from "../../controllers/types";

const routes = express.Router();

routes.get('/', getTypes);

routes.post('/', createType);

export default routes;
