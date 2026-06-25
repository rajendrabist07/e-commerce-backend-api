import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const fetchProduct =
            async () => {

                try {

                    const { data } =
                        await api.get(
                            `/products/${id}`
                        );

                    setProduct(
                        data.product
                    );

                } catch (error) {

                    console.log(error);

                } finally {

                    setLoading(false);

                }

            };

        fetchProduct();

    }, [id]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">

            <img
                src={
                    product.image ||
                    "https://via.placeholder.com/500"
                }
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
            />

            <h1 className="text-4xl font-bold mt-5">
                {product.name}
            </h1>

            <p className="mt-4 text-gray-600">
                {product.description}
            </p>

            <h2 className="text-2xl font-bold mt-4">
                Rs. {product.price}
            </h2>

            <button
                className="
        mt-5
        px-6
        py-3
        bg-black
        text-white
        rounded-xl
        "
            >
                Add To Cart
            </button>

        </div>
    );
}

export default ProductDetails;