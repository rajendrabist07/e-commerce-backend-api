import { Link } from "react-router-dom";

function ProductCard({ product }) {

    return (
        <div className="border rounded-xl p-4 shadow">

            <img
                src={
                    product.image ||
                    "https://via.placeholder.com/300"
                }
                alt={product.name}
                className="w-full h-48 object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-3">
                {product.name}
            </h2>

            <p className="text-gray-500">
                Rs. {product.price}
            </p>

            <Link
                to={`/products/${product._id}`}
                className="block mt-3 bg-black text-white text-center p-2 rounded"
            >
                View Details
            </Link>

        </div>
    );
}

export default ProductCard;