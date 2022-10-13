import express from "express";

import personRoutes from "./person";

const routes = express.Router();

routes.use("/person", personRoutes);

export default routes;
