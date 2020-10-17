import {Response} from "express";
import {TestController} from "./controllers/test.controller"

const express = require('express');
const router = express.Router();

router.get('/', (request: Request, response: Response) => {
    TestController.fetchTest().then((result) => {
        response.send(result)
    })
});

export {router}
