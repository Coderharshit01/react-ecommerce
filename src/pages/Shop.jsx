
import { useFetch } from "../hook/useFetch";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Cat, MoveRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";


function Shop({addToast}) {
    const [search , setSearch] = useState("")
    const [isSearched , setIsSearch] = useState(false)
    const [Categories , setCategories] = useState([])
    const Navigate = useNavigate()
    const { data,loading} = useFetch(`https://dummyjson.com/products/categories`)
    const [searchedPrd , setSearchedPrd] = useState([])
useEffect(()=>{
   if(data) {
    setCategories(data)
   }
},[data])
useEffect(()=>{
if(search == "") {
    setIsSearch(false)
}
},[search])
useEffect(()=>{
    if (Categories.length === 0 || Categories[0].products) return;
    const fetchData = async () => {
        const product = await Promise.all(
            Categories.map(async (cat)=>{
                const response = await fetch(cat.url)
                const d = await response.json()
                return d.products
            })
        )

        setCategories(prev =>
            prev.map((p,index) => ({...p , products : product[index].slice(0,5) }) ))
    }
    fetchData()
},[Categories])

useEffect(()=>{
const fetchData = async ()=>{
    if (!isSearched || search =="") return;
    const response = await fetch(`https://dummyjson.com/products/search?q=${search}`)
    const dat = await response.json()
    setSearchedPrd(dat.products)
}
fetchData()
},[isSearched])
    return (
        <> 
      <div className="flex flex-col gap-4 py-7 px-5">

      <div className="mt-16 mb-6 flex items-center justify-center">
  <div className="relative w-full max-w-lg">
    <input
      type="text"
      value={search}
      onKeyDown={(e) => {
        if (e.key === "Enter" && search.trim() !== "") setIsSearch(true);
      }}
      onChange={(e)=> setSearch(e.target.value)}
      placeholder="Search upto 100 products..."
      className="w-full rounded-full px-5 py-3 pr-12 text-gray-700 placeholder:text-gray-400 shadow-lg outline-none border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
    />
    <button
      className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 hover:text-teal-600 transition-colors duration-200"
      onClick={(e)=>{
        e.stopPropagation( )
        if(search !=="") {
               setIsSearch(true) 
        }
      }}
    >
      <Search size={22} />
    </button>
    {search && (
  <button
    className="absolute right-11 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 text-3xl"
    onClick={() => { setSearch(""); setIsSearch(false); }}
  >
    ×
  </button>
)}
  </div>
</div>

     {isSearched ? 
     <>
    
     {searchedPrd.length == 0 ? 
     <><p className="text-gray-600 italic text-3xl font-semibold text-center">No results Found !!!</p></> : 
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {searchedPrd.map((p,index) => (
            <ProductCard addToast={addToast} product={p} key={index} />
        ))}
     </div> }
     </>
    : <>
    {Categories.map((Cat)=>(
        <div className="flex flex-col gap-4 my-10" key={Cat.name}>
            <h2 className="font-semibold text-4xl">{Cat.name}</h2>
            <div className="flex gap-3 my-3 p-2 items-center  overflow-x-scroll overflow-y-hidden">
                {Cat?.products?.map((prd)=>(
                    <ProductCard product={prd} addToast={addToast} key={prd.title} />
                ))}

              
            </div>
            <button className="bg-gradient-to-br from-blue-300 to-teal-400 px-3 
                w-40 justify-center py-2 text-white  flex items-center rounded-lg shadow-xl gap-4 "
                onClick={()=> Navigate(`/category/${Cat.slug}`)}><span>View All </span><MoveRight /></button>
        </div>
     ))}
    </>}
      </div>
        </>
      );
}

export default Shop;