const MemoryDatabaseServer = require("../app/MemoryDatabaseServer");


async function createMemoryDatabase() {
    await MemoryDatabaseServer.start()
}

export default createMemoryDatabase;