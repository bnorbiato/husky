import express from "express";

import personRoutes from "./person";
import contactRoutes from "./contact";
import typeRoutes from "./types";

const routes = express.Router();

routes.use("/person", personRoutes);
routes.use("/contact", contactRoutes);
routes.use("/type", typeRoutes);

export default routes;
