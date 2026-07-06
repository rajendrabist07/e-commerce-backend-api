const request = require("supertest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = require("../src/app");
const User = require("../src/models/User");
const Product = require("../src/models/Product");

const createUser = async (overrides = {}) => {
    return User.create({
        name: overrides.name || "Test User",
        email: overrides.email || "test@example.com",
        password: await bcrypt.hash(overrides.password || "password123", 10),
        role: overrides.role || "user",
    });
};

const getToken = (user) => jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
);

describe("Health and docs", () => {
    test("GET / returns API health response", async () => {
        const res = await request(app).get("/");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("E-Commerce Backend API Running");
    });

    test("Swagger spec contains core API paths", async () => {
        const swaggerSpec = require("../src/docs/swagger");

        expect(swaggerSpec.openapi).toBe("3.0.0");
        expect(swaggerSpec.paths["/api/users/login"]).toBeDefined();
        expect(swaggerSpec.paths["/api/products"]).toBeDefined();
        expect(swaggerSpec.paths["/api/orders"]).toBeDefined();
        expect(swaggerSpec.components.securitySchemes.bearerAuth).toBeDefined();
    });
});

describe("Auth API", () => {
    test("register validates request body", async () => {
        const res = await request(app)
            .post("/api/users/register")
            .send({ email: "invalid", password: "123" });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.errors.length).toBeGreaterThan(0);
    });

    test("register creates user without leaking password", async () => {
        const res = await request(app)
            .post("/api/users/register")
            .send({
                name: "Rajendra Bist",
                email: "rajendra@example.com",
                password: "password123",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.user.email).toBe("rajendra@example.com");
        expect(res.body.data.user.password).toBeUndefined();
    });

    test("login returns token and sanitized user", async () => {
        await createUser({
            email: "login@example.com",
            password: "password123",
        });

        const res = await request(app)
            .post("/api/users/login")
            .send({
                email: "login@example.com",
                password: "password123",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.token).toBeDefined();
        expect(res.body.data.user.password).toBeUndefined();
    });

    test("profile requires bearer token", async () => {
        const user = await createUser();
        const token = getToken(user);

        const res = await request(app)
            .get("/api/users/profile")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.user.email).toBe(user.email);
        expect(res.body.user.password).toBeUndefined();
    });
});

describe("Product API", () => {
    test("GET /api/products returns paginated empty list", async () => {
        const res = await request(app).get("/api/products");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.products).toEqual([]);
        expect(res.body.totalProducts).toBe(0);
    });

    test("admin can create product", async () => {
        const admin = await createUser({
            email: "admin@example.com",
            role: "admin",
        });

        const res = await request(app)
            .post("/api/products")
            .set("Authorization", `Bearer ${getToken(admin)}`)
            .field("name", "Keyboard")
            .field("description", "Mechanical keyboard")
            .field("price", "2500")
            .field("stock", "10")
            .field("category", "Accessories");

        expect(res.statusCode).toBe(201);
        expect(res.body.data.product.name).toBe("Keyboard");
    });

    test("user can review product", async () => {
        const user = await createUser();
        const product = await Product.create({
            name: "Mouse",
            description: "Wireless mouse",
            price: 1200,
            stock: 5,
            category: "Accessories",
        });

        const res = await request(app)
            .post(`/api/products/${product._id}/review`)
            .set("Authorization", `Bearer ${getToken(user)}`)
            .send({
                rating: 4,
                comment: "Good product",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.product.numReviews).toBe(1);
        expect(res.body.data.product.rating).toBe(4);
    });
});
