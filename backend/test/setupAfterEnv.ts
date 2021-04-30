import dotenv from 'dotenv'
import * as databaseHelper from '../app/database'

dotenv.config();
jest.setTimeout(30000);

beforeAll(() => {
    return databaseHelper.connect();
})

beforeEach(() =>{
    return databaseHelper.truncate();
})

afterAll(() => {
    return databaseHelper.disconnect();
})