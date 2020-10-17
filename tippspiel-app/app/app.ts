import express = require('express');
import util = require('util')
import cors = require('cors')
import { createDatabase } from './database';

main();

async function main() {
    createDatabase();
    
    const app: express.Application = express();
    app.use(cors());

    app.get('/', async (req, res) =>  {
        res.send('Hello World')
    });
    
    app.listen(3000, () => {
        console.log('Example app listening on port 3000');
    })
}

