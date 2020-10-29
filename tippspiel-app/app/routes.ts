import express from "express";
import {userRoutes} from "./users/users.routes";

const Routes = express.Router();

Routes.use('/users', userRoutes)

export {Routes}
