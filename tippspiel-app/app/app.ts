import express = require('express');
import {createDatabase} from './database';
import {router} from './routes'

main();

async function main() {
    await createDatabase();

    const app: express.Application = express();
    app.use('/v1', router)
    
    app.listen(3000, () => {
        console.log('Example app listening on port 3000');
    })
}

