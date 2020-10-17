import {Document, model, Schema} from "mongoose";

interface ITest extends Document {
    name: string
}

const TestSchema = new Schema({
    name: String
})

const Test = model<ITest>('Test', TestSchema);
export {Test}