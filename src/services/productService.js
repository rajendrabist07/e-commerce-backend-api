const Product = require("../models/Product");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product
const createProduct = async (productData) => {
    return await Product.create(productData);
};

// Get All Products
const getProducts = async (queryParams) => {

    const resultPerPage = Number(queryParams.limit) || 8;

    const totalProducts = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(
        Product.find(),
        queryParams
    )
        .search()
        .filter()
        .sort()
        .paginate(resultPerPage);

    const products = await apiFeatures.query;

    return {
        products,
        totalProducts,
        page: Number(queryParams.page) || 1,
        limit: resultPerPage,
        totalPages: Math.ceil(totalProducts / resultPerPage),
    };
};

// Get Single Product
const getProductById = async (id) => {
    return await Product.findById(id);
};

// Update Product
const updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

// Delete Product
const deleteProduct = async (id) => {

    const product = await Product.findById(id);

    if (!product) {
        return null;
    }

    await product.deleteOne();

    return product;

};

const addOrUpdateReview = async (productId, user, reviewData) => {

    const product = await Product.findById(productId);

    if (!product) {
        return null;
    }

    const existingReview = product.reviews.find(
        review => review.user.toString() === user._id.toString()
    );

    if (existingReview) {

        existingReview.rating = reviewData.rating;
        existingReview.comment = reviewData.comment;

    } else {

        product.reviews.push({
            user: user._id,
            name: user.name,
            rating: reviewData.rating,
            comment: reviewData.comment,
        });

    }

    product.numReviews = product.reviews.length;

    const totalRating = product.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
    );

    product.rating = totalRating / product.numReviews;

    await product.save();

    return product;

};


// Update Product Stock
const updateProductStock = async (productId, quantity) => {

    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product Not Found");
    }

    if (product.stock < quantity) {
        throw new Error(`${product.name} is Out Of Stock`);
    }

    product.stock -= quantity;

    await product.save();

    return product;

};

const updateProductInventory = async (orderItems) => {

    for (const item of orderItems) {

        const product = await Product.findById(item.product);

        if (!product) {
            throw new Error("Product Not Found");
        }

        if (product.stock < item.quantity) {
            throw new Error(
                `${product.name} is Out Of Stock`
            );
        }

        product.stock -= item.quantity;
        product.sold += item.quantity;

        await product.save();
    }

};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addOrUpdateReview,
    updateProductStock,
    updateProductInventory,
};