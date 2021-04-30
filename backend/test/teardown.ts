const MemoryDatabaseServer = require("../app/MemoryDatabaseServer");

async function teardown() {
    await MemoryDatabaseServer.stop()
}

export default teardown;
