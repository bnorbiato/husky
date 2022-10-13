import express from "express";

import { getUser } from "../../controllers/user";

const routes = express.Router();

routes.get('/', getUser);

export default routes;
