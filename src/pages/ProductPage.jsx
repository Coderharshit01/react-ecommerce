import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hook/useFetch";
import { useEffect, useMemo, useState } from "react";
import { MoveLeft, Star } from "lucide-react";

function ProductPage({ addToast }) {
    const { name, id } = useParams()
    const Navigate = useNavigate()
    const [data, setData] = useState({})
    const { data: prdData, loading } = useFetch(`https://dummyjson.com/products/${id}`)
    const [currImage, setCurrImage] = useState("")
    useEffect(() => {
        if (prdData) {
            setCurrImage(prdData.thumbnail)
            setData({ ...prdData, quantity: 1 })
        }

    }, [prdData])
    if (loading) return <div className="text-center py-20 text-lg font-semibold">Loading...</div>
    return (
        <>
            <section className=" w-[90%] flex flex-col justify-center p-4 h-[90%] shadow-2xl mx-auto rounded-xl">
                <div className=" p-4 flex flex-col lg:flex-row gap-8 mt-20  mx-auto max-w-6xl  w-[90%] md:w-[70%]   ">
                    {console.log(data)}
                    <div className="flex flex-col gap-3 px-3 w-full lg:w-1/3 items-center lg:items-start">
                        <img src={currImage} alt={name} className="object-contain w-80 h-80 bg-gray-100" />


                        <div className="flex gap-3 bg-gray-100 p-3 items-center justify-center">
                            {data?.images?.map((i, index) => (
                                <img src={i} alt="pic" key={index} className={`w-16 h-16 object-contain hover:bg-white rounded-xl p-2 ${i == currImage ? "border border-1 border-red-400" : ""}`} onMouseEnter={() => setCurrImage(i)} />
                            ))}
                        </div>

                    </div>
                    <div className="flex flex-col gap-2 ">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{data?.title}</h2>
                        <p className="text-gray-500 italic capitalize cursor-pointer" onClick={() => Navigate(`/category/${data?.category}`)}  >{data?.category}</p>
                        <div className="flex gap-2 mt-4">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <span key={index} className={`${index < Math.round(data?.rating) ? 'text-yellow-500' : "text-gray-300"}`}><Star size={18} /></span>
                            ))}
                            <p className="text-gray-500 italic"> - reviews ({data?.reviews?.length})</p>
                        </div>
                        <p className="text-gray-500 italic font-serif text-center mt-2">"{data?.description}"</p>
                        <div className="flex items-center lg:items-start flex-col my-3">
                            <h3 className="coral text-3xl font-semibold">${(data?.price - (data?.discountPercentage / 100 * data?.price)).toFixed(2)}</h3>
                            <span className="text-md  text-gray-600 flex flex-row-reverse gap-2"> - {data?.discountPercentage}%  <span className="line-through">${data?.price}</span></span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <h2 className="font-normal ">Quantity : </h2>
                            <button
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-300 hover:bg-opacity-65 text-white font-bold transition-all duration-200 active:scale-95"
                                onClick={() => {
                                    setData(prev =>
                                        ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))
                                }}
                            >
                                −
                            </button>

                            <span className="font-semibold text-gray-800 min-w-8 text-center">
                                {data?.quantity}
                            </span>

                            <button
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-300 hover:bg-opacity-65 text-white font-bold transition-all duration-200 active:scale-95"
                                onClick={() => {
                                    setData(prev => ({
                                        ...prev,
                                        quantity: prev.quantity < prev.stock ? prev.quantity + 1 : prev.quantity
                                    }))
                                }}

                            >
                                +
                            </button>
                        </div>
                        <button className="bg-gradient-to-br from-yellow-300 w-[50%] mx-auto my-4 to-orange-400 text-white p-3 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-300/40 active:scale-95 transition-all"
                            onClick={() => {

                                addToast(data)
                            }}>
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className="flex flex-col my-3">
                    <p className="bg-gray-100 py-3 px-2 font-bold text-xl text-center md:text-2xl"> Rating and Reviews of {name}</p>
                    <div className="flex flex-col items-center justify-center my-3">
                        <h3 className="font-semibold text-3xl">{data?.rating} <span className="text-2xl text-gray-400">/5</span></h3>
                        <div className="flex gap-2 mt-4">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <span key={index} className={`${index < Math.round(data?.rating) ? 'text-yellow-500' : "text-gray-300"}`}><Star size={28} /></span>
                            ))}
                        </div>
                        <p className="text-gray-500 italic"> - reviews ({data?.reviews?.length})</p>
                        <div className="flex flex-col gap-4 w-[90%] md:w-[70%] mx-auto mt-6">
                            {data?.reviews && data.reviews.length > 0 ? (
                                data.reviews.map((review, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 shadow-md rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-lg capitalize">{review.reviewerName || `User ${index + 1}`}</h4>
                                            <div className="flex gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        className={`${i < Math.round(review.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mt-2 italic">"{review.comment}"</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-center italic mt-3">
                                    No reviews yet for this product.
                                </p>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductPage;