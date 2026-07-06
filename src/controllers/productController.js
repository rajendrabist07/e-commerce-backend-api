const asyncHandler = require("express-async-handler");
const product = require("../models/Product");
const imageService = require("../services/imageService")
const productService = require("../services/productService");
const { url } = require("../config/cloudinary");
const { raw } = require("express");



const createProduct = asyncHandler(async (req, res) => {

    const {
        name,
        description,
        price,
        stock,
        category,
    } = req.body;

    let image = {
        url: "",
        public_id: "",
    };

    if (req.file) {

        const uploadedImage =
            await imageService.uploadImage(req.file);

        image = {
            url: uploadedImage.secure_url,
            public_id: uploadedImage.public_id,
        };

    }

    const product =
        await productService.createProduct({

            name,
            description,
            price,
            stock,
            category,
            image,

        });

    res.status(201).json({

        success: true,

        message: "Product Created Successfully",

        data: {

            product,

        },

    });

});

const getProducts = asyncHandler(async (req, res) => {

    const result =
        await productService.getProducts(req.query);

    res.status(200).json({

        success: true,

        count: result.products.length,

        ...result,

    });

});

const getSingleProduct = asyncHandler(async (req, res) => {

    const product = await productService.getProductById(req.params.id);

    if (!product) {

        res.status(404);

        throw new Error("Product Not Found");

    }

    res.status(200).json({
        success: true,
        message: "Product Fetched Successfully",
        data: {
            product,
        },
    });

});

const updateProduct = asyncHandler(async (req, res) => {

    const existingProduct =
        await productService.getProductById(req.params.id);

    if (!existingProduct) {

        res.status(404);
        throw new Error("Product Not Found");

    }

    if (req.file) {

        // Delete old image
        if (existingProduct.image?.public_id) {

            await imageService.deleteImage(
                existingProduct.image.public_id
            );

        }

        // Upload new image
        const uploadedImage =
            await imageService.uploadImage(req.file);

        req.body.image = {

            url: uploadedImage.secure_url,

            public_id: uploadedImage.public_id,

        };

    }

    const updatedProduct =
        await productService.updateProduct(
            req.params.id,
            req.body
        );

    res.status(200).json({

        success: true,

        message: "Product Updated Successfully",

        data: {

            product: updatedProduct,

        },

    });

});

const deleteProduct = asyncHandler(async (req, res) => {

    const product =
        await productService.getProductById(req.params.id);

    if (!product) {

        res.status(404);

        throw new Error("Product Not Found");

    }

    // Delete image from Cloudinary
    if (product.image?.public_id) {

        await imageService.deleteImage(
            product.image.public_id
        );

    }

    // Delete from MongoDB
    await productService.deleteProduct(
        req.params.id
    );

    res.status(200).json({

        success: true,

        message: "Product Deleted Successfully",

    });

});

//  review
const createProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body;

    const product = await productService.addOrUpdateReview(
        req.params.id,
        req.user,
        {
            rating: Number(rating),
            comment,
        }
    );

    if (!product) {
        res.status(404);
        throw new Error("Product Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Review Saved Successfully",
        data: { product },
    });

});


module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
};