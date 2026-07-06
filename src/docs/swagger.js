const swaggerJsdoc = require("swagger-jsdoc");

const apiBaseUrl = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 2000}`;

const okResponse = (description = "Success") => ({
    description,
    content: {
        "application/json": {
            schema: {
                $ref: "#/components/schemas/ApiResponse",
            },
        },
    },
});

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Commerce Backend API",
            version: "1.0.0",
            description: "Production-ready MERN e-commerce REST API documentation.",
        },
        servers: [
            {
                url: apiBaseUrl,
                description: process.env.NODE_ENV === "production" ? "Production" : "Local",
            },
        ],
        tags: [
            { name: "Health" },
            { name: "Auth" },
            { name: "Products" },
            { name: "Cart" },
            { name: "Wishlist" },
            { name: "Orders" },
            { name: "Payments" },
            { name: "Coupons" },
            { name: "Dashboard" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                ApiResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Request completed successfully" },
                        data: { type: "object" },
                    },
                },
                RegisterRequest: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: { type: "string", example: "Rajendra Bist" },
                        email: { type: "string", format: "email", example: "rajendra@example.com" },
                        password: { type: "string", format: "password", example: "StrongPass123" },
                    },
                },
                LoginRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", format: "email", example: "rajendra@example.com" },
                        password: { type: "string", format: "password", example: "StrongPass123" },
                    },
                },
                ProductInput: {
                    type: "object",
                    required: ["name", "description", "price", "stock", "category"],
                    properties: {
                        name: { type: "string", example: "Wireless Mouse" },
                        description: { type: "string", example: "Ergonomic wireless mouse" },
                        price: { type: "number", example: 1999 },
                        stock: { type: "integer", example: 25 },
                        category: { type: "string", example: "Accessories" },
                        image: { type: "string", format: "binary" },
                    },
                },
                CartRequest: {
                    type: "object",
                    required: ["productId", "quantity"],
                    properties: {
                        productId: { type: "string", example: "64f1c2f5a6d7e8f901234567" },
                        quantity: { type: "integer", minimum: 1, example: 2 },
                    },
                },
                WishlistRequest: {
                    type: "object",
                    required: ["productId"],
                    properties: {
                        productId: { type: "string", example: "64f1c2f5a6d7e8f901234567" },
                    },
                },
                ReviewRequest: {
                    type: "object",
                    required: ["rating", "comment"],
                    properties: {
                        rating: { type: "number", minimum: 1, maximum: 5, example: 5 },
                        comment: { type: "string", example: "Excellent product" },
                    },
                },
                OrderRequest: {
                    type: "object",
                    required: ["orderItems", "shippingAddress", "totalPrice"],
                    properties: {
                        orderItems: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    product: { type: "string", example: "64f1c2f5a6d7e8f901234567" },
                                    quantity: { type: "integer", example: 1 },
                                },
                            },
                        },
                        shippingAddress: {
                            type: "object",
                            properties: {
                                address: { type: "string", example: "Kathmandu" },
                                city: { type: "string", example: "Kathmandu" },
                                postalCode: { type: "string", example: "44600" },
                                country: { type: "string", example: "Nepal" },
                            },
                        },
                        totalPrice: { type: "number", example: 1999 },
                        paymentMethod: { type: "string", enum: ["COD", "Stripe", "Khalti", "eSewa"], example: "COD" },
                    },
                },
                PaymentRequest: {
                    type: "object",
                    required: ["orderId", "paymentMethod"],
                    properties: {
                        orderId: { type: "string", example: "64f1c2f5a6d7e8f901234567" },
                        paymentMethod: { type: "string", enum: ["COD", "STRIPE", "ESEWA", "KHALTI"], example: "ESEWA" },
                    },
                },
                VerifyPaymentRequest: {
                    type: "object",
                    required: ["paymentId", "paymentStatus"],
                    properties: {
                        paymentId: { type: "string", example: "64f1c2f5a6d7e8f901234567" },
                        orderId: { type: "string", example: "64f1c2f5a6d7e8f901234567" },
                        transactionId: { type: "string", example: "TXN-12345" },
                        paymentStatus: { type: "string", enum: ["Pending", "Paid", "Failed", "Refunded"], example: "Paid" },
                    },
                },
                CouponRequest: {
                    type: "object",
                    required: ["code", "discount", "expiresAt"],
                    properties: {
                        code: { type: "string", example: "DASH10" },
                        discount: { type: "number", example: 10 },
                        expiresAt: { type: "string", format: "date-time" },
                    },
                },
            },
            parameters: {
                IdParam: {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            },
            responses: {
                Unauthorized: { description: "Unauthorized" },
                Forbidden: { description: "Admin access required" },
                NotFound: { description: "Resource not found" },
                ValidationError: { description: "Validation error" },
            },
        },
        paths: {
            "/": {
                get: {
                    tags: ["Health"],
                    summary: "API health check",
                    responses: { 200: okResponse("API is running") },
                },
            },
            "/api/users/register": {
                post: {
                    tags: ["Auth"],
                    summary: "Register a user",
                    requestBody: {
                        required: true,
                        content: { "application/json": { schema: { $ref: "#/components/schemas/RegisterRequest" } } },
                    },
                    responses: { 201: okResponse("User registered"), 400: { $ref: "#/components/responses/ValidationError" } },
                },
            },
            "/api/users/login": {
                post: {
                    tags: ["Auth"],
                    summary: "Login and receive JWT",
                    requestBody: {
                        required: true,
                        content: { "application/json": { schema: { $ref: "#/components/schemas/LoginRequest" } } },
                    },
                    responses: { 200: okResponse("Login successful"), 401: { $ref: "#/components/responses/Unauthorized" } },
                },
            },
            "/api/users/profile": {
                get: {
                    tags: ["Auth"],
                    summary: "Get logged-in user profile",
                    security: [{ bearerAuth: [] }],
                    responses: { 200: okResponse(), 401: { $ref: "#/components/responses/Unauthorized" } },
                },
            },
            "/api/users/forgot-password": {
                post: {
                    tags: ["Auth"],
                    summary: "Send password reset email",
                    requestBody: {
                        required: true,
                        content: { "application/json": { schema: { type: "object", properties: { email: { type: "string", format: "email" } } } } },
                    },
                    responses: { 200: okResponse("Password reset email sent") },
                },
            },
            "/api/users/reset-password/{token}": {
                put: {
                    tags: ["Auth"],
                    summary: "Reset user password",
                    parameters: [{ name: "token", in: "path", required: true, schema: { type: "string" } }],
                    requestBody: {
                        required: true,
                        content: { "application/json": { schema: { type: "object", properties: { password: { type: "string", minLength: 6 } } } } },
                    },
                    responses: { 200: okResponse("Password reset successfully") },
                },
            },
            "/api/products": {
                get: {
                    tags: ["Products"],
                    summary: "List products",
                    parameters: [
                        { name: "keyword", in: "query", schema: { type: "string" } },
                        { name: "category", in: "query", schema: { type: "string" } },
                        { name: "page", in: "query", schema: { type: "integer" } },
                        { name: "limit", in: "query", schema: { type: "integer" } },
                    ],
                    responses: { 200: okResponse() },
                },
                post: {
                    tags: ["Products"],
                    summary: "Create product",
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/ProductInput" } } },
                    },
                    responses: { 201: okResponse("Product created"), 403: { $ref: "#/components/responses/Forbidden" } },
                },
            },
            "/api/products/{id}": {
                get: {
                    tags: ["Products"],
                    summary: "Get product by id",
                    parameters: [{ $ref: "#/components/parameters/IdParam" }],
                    responses: { 200: okResponse(), 404: { $ref: "#/components/responses/NotFound" } },
                },
                put: {
                    tags: ["Products"],
                    summary: "Update product",
                    security: [{ bearerAuth: [] }],
                    parameters: [{ $ref: "#/components/parameters/IdParam" }],
                    requestBody: {
                        content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/ProductInput" } } },
                    },
                    responses: { 200: okResponse("Product updated"), 403: { $ref: "#/components/responses/Forbidden" } },
                },
                delete: {
                    tags: ["Products"],
                    summary: "Delete product",
                    security: [{ bearerAuth: [] }],
                    parameters: [{ $ref: "#/components/parameters/IdParam" }],
                    responses: { 200: okResponse("Product deleted"), 403: { $ref: "#/components/responses/Forbidden" } },
                },
            },
            "/api/products/{id}/review": {
                post: {
                    tags: ["Products"],
                    summary: "Create or update product review",
                    security: [{ bearerAuth: [] }],
                    parameters: [{ $ref: "#/components/parameters/IdParam" }],
                    requestBody: {
                        required: true,
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ReviewRequest" } } },
                    },
                    responses: { 200: okResponse("Review saved") },
                },
            },
            "/api/cart": {
                get: { tags: ["Cart"], summary: "Get my cart", security: [{ bearerAuth: [] }], responses: { 200: okResponse() } },
                post: {
                    tags: ["Cart"],
                    summary: "Add product to cart",
                    security: [{ bearerAuth: [] }],
                    requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CartRequest" } } } },
                    responses: { 201: okResponse("Product added to cart") },
                },
            },
            "/api/cart/{id}": {
                put: {
                    tags: ["Cart"],
                    summary: "Update cart quantity",
                    security: [{ bearerAuth: [] }],
                    parameters: [{ $ref: "#/components/parameters/IdParam" }],
                    requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { quantity: { type: "integer", minimum: 1 } } } } } },
                    responses: { 200: okResponse("Cart updated") },
                },
                delete: { tags: ["Cart"], summary: "Remove cart item", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { 200: okResponse("Cart item removed") } },
            },
            "/api/wishlist": {
                get: { tags: ["Wishlist"], summary: "Get my wishlist", security: [{ bearerAuth: [] }], responses: { 200: okResponse() } },
                post: {
                    tags: ["Wishlist"],
                    summary: "Add product to wishlist",
                    security: [{ bearerAuth: [] }],
                    requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/WishlistRequest" } } } },
                    responses: { 201: okResponse("Wishlist created") },
                },
            },
            "/api/wishlist/{id}": {
                delete: { tags: ["Wishlist"], summary: "Remove wishlist item", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { 200: okResponse("Wishlist removed") } },
            },
            "/api/orders": {
                post: {
                    tags: ["Orders"],
                    summary: "Place order",
                    security: [{ bearerAuth: [] }],
                    requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/OrderRequest" } } } },
                    responses: { 201: okResponse("Order placed") },
                },
            },
            "/api/orders/my-orders": {
                get: { tags: ["Orders"], summary: "Get my orders", security: [{ bearerAuth: [] }], responses: { 200: okResponse() } },
            },
            "/api/orders/{id}": {
                get: { tags: ["Orders"], summary: "Get order by id", security: [{ bearerAuth: [] }], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { 200: okResponse() } },
            },
            "/api/orders/admin": {
                get: { tags: ["Orders"], summary: "Admin list all orders", security: [{ bearerAuth: [] }], responses: { 200: okResponse(), 403: { $ref: "#/components/responses/Forbidden" } } },
            },
            "/api/orders/admin/{id}": {
                put: {
                    tags: ["Orders"],
                    summary: "Admin update order status",
                    security: [{ bearerAuth: [] }],
                    parameters: [{ $ref: "#/components/parameters/IdParam" }],
                    requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { orderStatus: { type: "string", enum: ["Processing", "Shipped", "Delivered", "Cancelled"] } } } } } },
                    responses: { 200: okResponse("Order status updated"), 403: { $ref: "#/components/responses/Forbidden" } },
                },
            },
            "/api/payments": {
                post: {
                    tags: ["Payments"],
                    summary: "Create payment record",
                    security: [{ bearerAuth: [] }],
                    requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/PaymentRequest" } } } },
                    responses: { 201: okResponse("Payment created") },
                },
            },
            "/api/payments/verify": {
                put: {
                    tags: ["Payments"],
                    summary: "Verify/update payment",
                    security: [{ bearerAuth: [] }],
                    requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/VerifyPaymentRequest" } } } },
                    responses: { 200: okResponse("Payment updated") },
                },
            },
            "/api/coupons": {
                post: {
                    tags: ["Coupons"],
                    summary: "Admin create coupon",
                    security: [{ bearerAuth: [] }],
                    requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CouponRequest" } } } },
                    responses: { 201: okResponse("Coupon created"), 403: { $ref: "#/components/responses/Forbidden" } },
                },
            },
            "/api/coupons/apply": {
                post: {
                    tags: ["Coupons"],
                    summary: "Apply coupon",
                    security: [{ bearerAuth: [] }],
                    requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { code: { type: "string" }, totalPrice: { type: "number" } } } } } },
                    responses: { 200: okResponse("Coupon applied") },
                },
            },
            "/api/dashboard/stats": {
                get: { tags: ["Dashboard"], summary: "Admin dashboard stats", security: [{ bearerAuth: [] }], responses: { 200: okResponse(), 403: { $ref: "#/components/responses/Forbidden" } } },
            },
            "/api/dashboard/recent-orders": {
                get: { tags: ["Dashboard"], summary: "Recent orders", security: [{ bearerAuth: [] }], responses: { 200: okResponse() } },
            },
            "/api/dashboard/low-stock": {
                get: { tags: ["Dashboard"], summary: "Low stock products", security: [{ bearerAuth: [] }], responses: { 200: okResponse() } },
            },
            "/api/dashboard/top-products": {
                get: { tags: ["Dashboard"], summary: "Top products", security: [{ bearerAuth: [] }], responses: { 200: okResponse() } },
            },
            "/api/dashboard/monthly-sales": {
                get: { tags: ["Dashboard"], summary: "Monthly sales", security: [{ bearerAuth: [] }], responses: { 200: okResponse() } },
            },
        },
    },
    apis: [],
};

module.exports = swaggerJsdoc(options);
