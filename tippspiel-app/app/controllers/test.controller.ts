import {Test} from "../schemas/test.schema";

class TestController {
    static async fetchTest() {
        const query = Test.find({});
        return await query.exec()
    }
}

export {TestController}