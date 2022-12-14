import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import authMiddleware from "./app/middlewares/auth";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import AdController from "./app/controllers/AdController";
import CommentController from "./app/controllers/CommentController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/sessions", SessionController.store);
routes.get("/ads", AdController.index);

routes.use(authMiddleware);

routes.post("/users", UserController.store);
routes.put("/users", UserController.update);
routes.delete("/users/:id", UserController.delete);
routes.post("/ads", AdController.store);
routes.post("/files", upload.single("file"), FileController.store);
routes.post("/comments", CommentController.store);

export default routes;
