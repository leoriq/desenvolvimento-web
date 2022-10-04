import { Router } from "express";

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.use(authMiddleware);


export default routes;