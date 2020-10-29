import {Document, model, Schema} from "mongoose";

export class Test {
    constructor(
        public name: string
    ) {
    }
}

export interface TestDocument extends Test, Document {
}


const TestSchema = new Schema({
    name: String
})

export const Tests = model<TestDocument>('Tests', TestSchema);