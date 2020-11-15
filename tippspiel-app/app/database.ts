import mongoose from "mongoose"
import * as fs from "fs";
import path from "path";

const globalAny: any = global

async function connect() {
    if (mongoose.connection.readyState === 0) {

        await mongoose.connect(
            process.env.NODE_ENV === 'test' ? globalAny.__DB_URL__ : process.env.DB_URL,
            {
                user: process.env.NODE_ENV === 'test' ? '' : "root",
                pass: process.env.NODE_ENV === 'test' ? '' : fs.readFileSync(path.join(__dirname, "mongo_password.txt"), "utf-8"),
                authSource: "admin",
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            }
        );
    }
}

async function truncate() {
    if (mongoose.connection.readyState !== 0) {
        const {collections} = mongoose.connection;

        const promises = Object.keys(collections).map(collection =>
            mongoose.connection.collection(collection).deleteMany({})
        );

        await Promise.all(promises);
    }
}

async function disconnect() {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
}

export {
    connect,
    truncate,
    disconnect
};
