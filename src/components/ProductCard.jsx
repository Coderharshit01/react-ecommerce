import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function ProductCard({product , addToast}) {
    const Navigate = useNavigate()
    return (

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className=" 
        relative flex flex-col items-center px-4 py-3 shadow-xl rounded-xl transition-all hover:shadow-lg
         hover:shadow-yellow-400/40 duration-150  h-full " onClick={()=> Navigate(`/products/${product.title}/${product.id}`)}>
            <img src={product?.images[0]} alt={product.title}  className="w-[90%] h-40 md:h-52  object-contain bg-gray-100 p-2 my-1"/>
            <h2 className="font-medium text-xl line-clamp-2">{product.title}</h2>
            <div className="flex flex-col lg:flex-row  mb-2 mt-4 justify-between items-center w-full">
                <div className="flex flex-row gap-1 my-2 items-center">
                {Array.from({length:5}).map((_,index)=>(
                    <span key={index} className={`${index<Math.round(product.rating) ? 'text-yellow-500' : "text-gray-300"}`}><Star size={18}  /></span>
                ))}
                </div>
                <h2 className={`${product?.availabilityStatus== "In Stock" ? 'text-lime-400' : 'text-yellow-500'} text-xl font-semibold`}>{product?.availabilityStatus}</h2>
            </div>
            <p className="text-lg font-semibold text-gray-800 mb-3  ">${product.price}</p>
            <button className="bg-gradient-to-br from-yellow-300 to-orange-400 text-white p-3 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-300/40 active:scale-95 transition-all"
            onClick={(e)=>{
                e.stopPropagation()
                addToast(product)}}>
  Add to Cart
</button>

        </motion.div>
      );
}

export default ProductCard;