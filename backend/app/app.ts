import dotenv from 'dotenv'
import express, {Express} from 'express'
import bodyParser from "body-parser";
import {Routes} from "./routes";
import * as databaseHelper from "./database"
dotenv.config()

class App {

    public express: Express;
    constructor() {
        this.express = express()
        this.database();
        this.middlewares();
        this.routes();
    }

    private database() {
        databaseHelper.connect()
    }

    private middlewares() {
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(bodyParser.json());
    }

    private routes() {
        this.express.use('/v1', Routes);
    }
}

export const app = new App().express