const { data } = require("react-router-dom");
const Product = require("../models/Product");



const createProduct = async (req, res) => {
    try {

        const {
            name,
            description,
            price,
            stock,
            image,
        } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            image,
        });

        res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            data: {
                product,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            message: "Products Fetched Successfully",
            count: products.length,
            data: {
                products,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getSingleProduct = async (req, res) => {
    try {

        const product = await Product.findById(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Fetched Successfully",
            data: {
                product,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const updateProduct = async (req, res) => {
    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            data: {
                product,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};