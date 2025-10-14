import { useParams } from "react-router-dom";
import { useFetch } from "../hook/useFetch";
import ProductCard from "../components/ProductCard";
import { useScroll } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
function CategoryPage({ addToast }) {
    const { name } = useParams();
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState("");
    const { data, loading } = useFetch(`https://dummyjson.com/products/category/${name}`);

    useEffect(() => {
        if (data) setProducts(data.products);
    }, [data]);

    const filteredProducts = useMemo(() => {
        let tempProducts = [...products];
        switch (sort) {
            case "price-low":
                tempProducts.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                tempProducts.sort((a, b) => b.price - a.price);
                break;
            case "rating-high":
                tempProducts.sort((a, b) => b.rating - a.rating);
                break;
            case "rating-low":
                tempProducts.sort((a, b) => a.rating - b.rating);
                break;
            default:
                break;
        }
        return tempProducts;
    }, [products, sort]);

    return (
        <div className="flex flex-col gap-3 my-10 py-6 px-4 min-h-screen">
           <div className="w-full flex justify-between p-4">
           <h2 className="font-bold text-4xl capitalize bg-gradient-to-br from-teal-300 via-purple-600 to-pink-600 bg-clip-text text-transparent">{name}</h2>

{/* Sort Dropdown */}
<div className="flex gap-2 mb-4">
    <select
        className="border p-2 rounded"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
    >
        <option value="">Sort By</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating-high">Rating: High to Low</option>
        <option value="rating-low">Rating: Low to High</option>
    </select>
</div>

           </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4">
                {filteredProducts.map(prd => (
                    <ProductCard key={prd.id} addToast={addToast} product={prd} />
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;