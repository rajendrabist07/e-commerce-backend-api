import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get("/products");

            setProducts(data.products);

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                All Products
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}

            </div>

        </div>
    );
}

export default Products;