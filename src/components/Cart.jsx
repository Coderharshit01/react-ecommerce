import { useScroll } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ CartItems, setCartItems,addToast }) {
    const Navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const [checkOut , setCheckOut] = useState(false)
    useEffect(() => {
        let total = 0
        CartItems.forEach(item => {
            total += (item.price * item.quantity)
        });
        setTotal((total + 10).toFixed(2))
    }, [CartItems])

    return (
        <>
            <div className="flex flex-col my-10 py-5 px-4 w-full max-w-7xl mx-auto">
                <h2 className="font-bold coral text-4xl mb-8">My Items</h2>

                {CartItems.length !== 0 ?
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Cart Items Grid */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {CartItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                                >
                                    {/* Product Image */}
                                    <div className="flex justify-center mb-4">
                                        <img
                                            src={item.thumbnail}
                                            className="object-contain w-20 h-20 rounded-lg"
                                            alt={item.title}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="space-y-4">
                                        {/* Title */}
                                        <h3 className="font-semibold text-gray-900 text-center line-clamp-2 text-sm leading-tight min-h-[2.5rem]">
                                            {item.title}
                                        </h3>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all duration-200 active:scale-95"
                                                onClick={() => setCartItems(prev =>
                                                    prev.map((p, i) => i === index ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p)
                                                )}
                                            >
                                                −
                                            </button>

                                            <span className="font-semibold text-gray-800 min-w-8 text-center">
                                                {item.quantity}
                                            </span>

                                            <button
                                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all duration-200 active:scale-95"
                                                onClick={() => setCartItems(prev =>
                                                    prev.map((p, i) => i === index ? { ...p, quantity: p.quantity + 1 } : p)
                                                )}
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Price + Remove */}
                                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                            <span className="font-bold text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                            <button
                                                className="text-red-500 hover:text-red-600 font-medium text-sm transition-all duration-200 hover:scale-105 px-2 py-1 rounded hover:bg-red-50"
                                                onClick={() => setCartItems(prev => prev.filter((p) => p.id !== item.id))}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-96 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-fit sticky top-28">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${(total - 10).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>$10.00</span>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-200" />
                            <div className="flex justify-between font-bold text-lg mb-6 text-gray-900">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                            <button className="w-full py-3 rounded-xl bg-gradient-to-r
                             from-yellow-400 to-pink-500 text-white font-semibold 
                             hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                             onClick={()=>{
                                setCartItems([])
                                addToast()
                             }}>
                                Checkout
                            </button>
                            <p
                                className="text-center text-sm text-gray-500 mt-4 hover:text-gray-700 cursor-pointer transition-colors"
                                onClick={() => Navigate('/products')}
                            >
                                Continue Shopping
                            </p>
                        </div>

                    </div>
                    :
                    <div className="text-center py-20">
                        <ShoppingCart size={120} className="w-32 h-32 mx-auto opacity-60 text-gray-400" />
                        <h3 className="text-2xl font-semibold mt-6 text-gray-700">Your cart is empty</h3>
                        <p className="text-gray-500 mb-8 mt-2">Looks like you haven't added anything yet.</p>
                        <button
                            className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                            onClick={() => Navigate('/products')}
                        >
                            Start Shopping
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

export default Cart;