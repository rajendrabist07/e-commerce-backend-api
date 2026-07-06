const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
    process.env.NODE_ENV = "test";
    process.env.JWT_SECRET = "test-secret";
    process.env.JWT_EXPIRE = "1h";
    process.env.DISABLE_EMAIL = "true";
    process.env.CORS_ORIGIN = "http://localhost:5173";

    mongoServer = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongoServer.getUri();

    await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
    const collections = await mongoose.connection.db.collections();

    await Promise.all(
        collections.map(collection => collection.deleteMany({}))
    );
});

afterAll(async () => {
    await mongoose.disconnect();

    if (mongoServer) {
        await mongoServer.stop();
    }
});
