import { useState, useEffect, useRef ,useMemo} from "react";
import HeroSection from "../components/HeroSection";
import { useFetch } from "../hook/useFetch";
import ProductCard from "../components/ProductCard";
import { Rocket, Gem, RefreshCw, Minus, LockKeyhole, Star, X, MapPin, StepBack, StepForward, Circle, Plus, Instagram, Facebook } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


function Home({addToast}) {
  const Navigate = useNavigate()
  const [faqId , setFaqId] = useState(null)
  const [currIndex, setCurrIndex] = useState(0)
  const [fProd, setFprod] = useState([])
  const [fCat, setFcat] = useState([]);
  const { data: categories, loading: loadingCat } = useFetch("https://dummyjson.com/products/categories");
  const { data: product, loading: loadingProducts } = useFetch("https://dummyjson.com/products")


// 1️⃣ Pick random categories (sync, memoized)
const featuredCats = useMemo(() => {
  if (!categories) return [];
  return categories.sort(() => Math.random() - 0.5).slice(0, 4);
}, [categories]);



useEffect(() => {
  const fetchImages = async () => {
    const imgs = await Promise.all(
      featuredCats.map(async (cat) => {
        const res = await fetch(cat.url); 
        const data = await res.json();
        return data.products?.[0]?.thumbnail;
      })
    );

    setFcat(featuredCats.map((cat, i) => ({ ...cat, img: imgs[i] })));
  };

  if (featuredCats.length > 0) fetchImages();
}, [featuredCats]);


  useEffect(() => {
    if (product && fCat.length === 0) {
      const featured = product.products.sort(() => Math.random() - 0.5).slice(0, 8);
      setFprod(featured);
    }
  }, [product]);

  const testimonials = [
    {
      id: 1,
      rating: 5,
      name: "Sophia Turner",
      review: "I ordered a few items last month and was blown away by the quality and packaging. Everything arrived on time and exactly as described. The checkout process was smooth and intuitive, and customer service responded quickly when I had questions. Truly one of the best shopping experiences I've had online!",
      date: "2025-09-15",
      location: "New York, USA",
      profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
      productTags: ["Fashion", "Accessories", "Eco-friendly"]
    },
    {
      id: 2,
      rating: 4,
      name: "Liam Carter",
      review: "Overall a great experience. The product was excellent and matched the pictures perfectly. I had a small delay with delivery due to external factors, but the store kept me updated the whole time. I appreciate their transparency and attention to detail. Will definitely shop here again.",
      date: "2025-09-20",
      location: "London, UK",
      profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
      productTags: ["Electronics", "Gadgets"]
    },
    {
      id: 3,
      rating: 5,
      name: "Emma Johnson",
      review: "This is hands-down my favorite online store now. The variety of products is amazing, and every item I’ve bought has been of top quality. Packaging is secure and eco-friendly, which I really love. The site is easy to navigate and I always find what I need. Highly recommend to anyone who loves hassle-free shopping!",
      date: "2025-09-25",
      location: "Sydney, Australia",
      profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
      productTags: ["Home Decor", "Fashion", "Lifestyle"]
    },
    {
      id: 4,
      rating: 3,
      name: "Noah Smith",
      review: "The product quality was good, but delivery took longer than expected. I understand delays happen, but it would have been nice to get proactive updates. The packaging was intact and the product worked well, so I’m satisfied overall. They could improve on communication though.",
      date: "2025-10-01",
      location: "Toronto, Canada",
      profilePic: "https://randomuser.me/api/portraits/men/34.jpg",
      productTags: ["Kitchen", "Appliances"]
    },
    {
      id: 5,
      rating: 4,
      name: "Olivia Brown",
      review: "I’m impressed with the quality and service overall. The product arrived in perfect condition and the description was accurate. I had a small issue with size options, but customer service handled it very professionally. I will definitely return for future purchases. Great job!",
      date: "2025-10-05",
      location: "Berlin, Germany",
      profilePic: "https://randomuser.me/api/portraits/women/72.jpg",
      productTags: ["Fashion", "Footwear"]
    },
    {
      id: 6,
      rating: 5,
      name: "Ethan Wilson",
      review: "Fantastic shopping experience! The website is easy to use, and the product variety is impressive. I ordered on a whim and was pleasantly surprised by the fast delivery and high-quality items. The attention to detail in packaging shows they truly care about their customers. Highly recommended for anyone shopping online.",
      date: "2025-10-08",
      location: "Los Angeles, USA",
      profilePic: "https://randomuser.me/api/portraits/men/76.jpg",
      productTags: ["Tech", "Gadgets", "Accessories"]
    }
  ];
  const faqs = [
    {
      id: 1,
      qn: "What payment methods do you accept?",
      ans: "We accept all major debit/credit cards, digital wallets, and bank transfers for a smooth checkout experience."
    },
    {
      id: 2,
      qn: "How long does shipping take?",
      ans: "Orders are typically delivered within 3–5 business days. International orders may take 7–10 days depending on location."
    },
    {
      id: 3,
      qn: "Can I return or exchange a product?",
      ans: "Yes! You can return or exchange items within 7 days of delivery as long as they are unused and in original packaging."
    },
    {
      id: 4,
      qn: "Do you offer international shipping?",
      ans: "Yes, we ship worldwide with trusted courier partners. Shipping costs and delivery times vary by region."
    },
    {
      id: 5,
      qn: "Are your products authentic?",
      ans: "Absolutely. Every product we sell is 100% genuine and verified for quality and authenticity before shipping."
    },
    {
      id: 6,
      qn: "How can I track my order?",
      ans: "Once your order is shipped, you'll receive an email with a tracking link so you can monitor your delivery in real-time."
    }
  ];


  useEffect(()=>{
 const IntervalId =  setInterval(()=>{
setCurrIndex(prev => (prev+1)%testimonials.length)
 },3000)
return () => clearInterval(IntervalId)
  },[testimonials.length])

  const cards = [
    {
      id: 1,
      title: "Fast Delivery",
      desc: "Lightning-fast shipping that gets your order to your door before you know it.",
      symbol: Rocket,
      color: "text-orange-500"  // energetic, speed-themed
    },
    {
      id: 2,
      title: "Quality Products",
      desc: "Only the finest products — crafted, tested, and guaranteed to impress.",
      symbol: Gem,
      color: "text-emerald-500"  // premium, luxury tone
    },
    {
      id: 3,
      title: "Easy Returns",
      desc: "Changed your mind? Our seamless return process makes it effortless.",
      symbol: RefreshCw,
      color: "text-sky-500"  // calm, smooth process vibe
    },
    {
      id: 4,
      title: "Secure Payment",
      desc: "Your privacy and payments are protected with top-grade encryption.",
      symbol: LockKeyhole,
      color: "text-purple-500"  // trustworthy and modern
    }
  ];

  const prevTestimonial = () => {
  
    setCurrIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const nextTestimonial = () => {

    setCurrIndex(prev => (prev + 1) % testimonials.length);
  };
  

  return (
    <main className="h-full">
      {/* Hero Section */}
      <HeroSection />
      {/* Featured Catagories Section */}
      <section
        className="flex flex-col gap-3 my-2 p-4"
        aria-label="Featured-categories"
      >
        <h2 className="font-bold text-4xl coral">Featured Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {fCat.map((cat) => (
            <div
              key={cat.slug}
              className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition py-2"
              onClick={()=>Navigate(`/category/${cat.slug}`)}
            >
              {cat.img ? (
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-40 md:h-56 lg:h-64 object-contain bg-gray-100"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 animate-pulse" />
              )}
              <p className="text-center font-semibold mt-2">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>
      {/*Featured Product  */}
      <section className="my-3 p-4 flex flex-col gap-3" aria-label="Featured Products">

        <h2 className="font-bold bg-gradient-to-br from-pink-500 to-red-600 bg-clip-text text-transparent text-4xl">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {fProd.map((prd) => (
            <ProductCard   product={prd} key={prd?.title} addToast={addToast} />
          ))}

        </div>
      </section>

      {/* Why choose US */}
      <section id="services" className="my-5 p-4 flex flex-col gap-3" aria-label="Why Choose Us" >
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Why Choose Us ?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 ">
          {cards.map((card) => (
            <div className="flex hover:scale-105 transition-all duration-150 flex-col gap-1 items-center p-3 shadow-2xl rounded-xl" key={card.id}>
              <span className={` w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center animate-bubble ${card.color} `}><card.symbol size={68} /></span>
              <h2 className="text-xl my-1 italic">{card.title}</h2>
              <p className="text-md my-1 text-center font-light italic text-gray-500">{card.desc}</p>

            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="my-4 p-3 px-8" aria-label="Testimonials">
        <h2 className=" text-4xl font-semibold font-serif">What Our Customers Say  </h2>

        <p className="mt-4 text-md text-gray-400 max-w-[89%] md:max-w-[50%]">
          We're honoured by the feedback , and it fuels for our commitment for delivering exceptional quality service . Read the reviews to hear firsthand how KIRAZON is making a positive impact on people's lives. Your trust is our greatest achivement
        </p>
        <div className="flex flex-col items-center justify-center relative overflow-hidden">


            <motion.div

             className="  bg-gradient-to-br from-white to-pink-200 
           mt-5 flex py-4 px-6 flex-col gap-4 shadow-2xl hover:shadow-pink-200/70 hover:scale-[1.01]
            transition-all duration-300
            w-[85%] md:w-[50%] lg:w-[40%] rounded-xl"
            >

              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={18} className={`${index < testimonials[currIndex].rating ? "text-green-500" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-center text-md italic font-light">"{testimonials[currIndex].review}"</span>
              <div className="flex gap-2 mt-2 items-center">
                <img src={testimonials[currIndex].profilePic} alt="" className="rounded-full w-12 h-12" />
                <span className="text-md italic font-serif  text-gray-700 font-medium"> - {testimonials[currIndex].name}</span>
              </div>
              <span className="flex gap-1 text-sm text-gray-500 italic items-center"><MapPin />  {testimonials[currIndex].location}</span>

            </motion.div>
          <div className="flex justify-around items-center min-w-[70%]  my-5">
            <button type="button" onClick={prevTestimonial} className="py-3 md:px-5 px-3 hover:bg-pink-100
 bg-gray-100 text-pink-500 shadow-xl rounded-md text-center hover:scale-105 transition-all duration-100"><StepBack /></button>
            <div className="flex gap-2" aria-label="Previous testimonial">
              {Array.from({ length: testimonials.length }).map((_, index) => (
                <Circle size={10} key={index} className={` transition-all duration-200 scale-90 hover:scale-110
                  outline-none  ${index === currIndex ? "bg-blue-300 shadow-md" : "bg-gray-200"}`} />
              ))}

            </div>
            <button type="button" aria-label="Next testimonial"
              onClick={nextTestimonial} className="py-3 md:px-5 px-3 hover:bg-blue-100 bg-gray-100 text-blue-500 shadow-xl rounded-md text-center hover:scale-105 transition-all duration-100"><StepForward /></button>

          </div>
        </div>

      </section>
{/*FAQ */}
<section id="faq" className="my-4 p-3 px-8" aria-label="FAQs">
<h2 className="font-semibold text-4xl">FAQs</h2>
<div className="flex flex-col gap-3 items-center justify-center my-4">
{faqs.map((faq)=>(
  <div className="w-[90%] md:w-[70%] lg:w-[60%] shadow-2xl rounded-xl flex flex-col gap-3  p-3" key={faq.id}>
  <div className="flex items-center justify-between">

  <span className="italic font-light text-xl">{faq.qn}</span>
  <button
  aria-expanded={faqId === faq.id}
  aria-controls={`faq-${faq.id}`}
  className="p-3 text-blue-400 hover:text-blue-500 transition-transform duration-150 hover:scale-110"
  onClick={() => setFaqId(faqId === faq.id ? null : faq.id)}
>
  {faqId === faq.id ? <Minus size={25}/> : <Plus size={25}/>}
</button>

  </div>
   {faq.id == faqId ? 
  <p 
  className={`text-center italic font-serif transition-all duration-300 ease-in-out ${
    faq.id === faqId ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
  }`}
>
  {faq.ans}
</p>
   : ""}
  </div>
  ))}
</div>
</section>

{/* Footer */}
<footer className="bg-gradient-to-br from-pink-200 via-red-300 to-purple-400 text-gray-800 py-10 px-6 md:px-16">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* Brand Info */}
    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-2xl font-bold ">KIRAZON</h3>
      <p className="mt-2 text-sm text-gray-500 text-center md:text-left">
        Bringing quality and comfort straight to your doorstep.
      </p>
    </div>

    {/* Quick Links */}
    <div className="flex flex-col items-center">
      <h4 className="text-lg font-semibold  mb-3">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
        <li><a  className="hover:text-blue-400 transition-colors" onClick={()=> Navigate('/products')}>Shop</a></li>
        <li><a href="#faq" className="hover:text-blue-400 transition-colors">FAQs</a></li>
        <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
      </ul>
    </div>

    {/* Policies + Socials */}
    <div className="flex flex-col items-center md:items-end">
      <h4 className="text-lg font-semibold  mb-3">Support</h4>
      <ul className="space-y-2 text-sm text-center md:text-right">
        <li><a href="#" className="hover:text-blue-400 transition-colors">Return Policy</a></li>
        <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-blue-400 transition-colors">Terms & Conditions</a></li>
      </ul>
      <div className="flex gap-4 mt-4">
        <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Instagram">
          <Instagram />
        </a>
        <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
          <X />
        </a>
        <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
          <Facebook />
        </a>
      </div>
    </div>

  </div>

  {/* Bottom Line */}
  <p className="text-sm text-gray-500 text-center mt-10 border-t border-gray-700 pt-4">
    © 2025 KIRAZON. All rights reserved.
  </p>
</footer>


    </main>
  );
}

export default Home;
