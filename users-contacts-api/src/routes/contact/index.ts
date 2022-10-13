import express from "express";

import { moveContact } from "../../controllers/contact";
import { stageRules } from "../../utils/validationRules";
import { validate } from "../../middlewares/validation";

const routes = express.Router();

routes.patch("/:id", stageRules(), validate, moveContact);

export default routes;
