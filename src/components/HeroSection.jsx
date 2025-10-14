
import { useNavigate } from 'react-router-dom';
import '../App.css'

function HeroSection() {
  const Navigate = useNavigate()
    return ( 
        <section aria-label="Hero" className="h-[90vh] lg:h-[95vh] relative bg-gradient-to-br from-pink-200 via-yellow-50 overflow-hidden to-blue-200 px-4 ">
            {/* Gradient background blurs */}
            <div className="absolute rounded-full w-32 h-32 bg-pink-300 opacity-100 -top-5 -left-3 blur-lg"></div>
            <div className="absolute rounded-full w-32 h-32 bg-blue-500 opacity-20 -right-3 -bottom-5 blur-xl "></div>
            <div className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-blue-300 via-indigo-200 to-transparent opacity-40 blur-3xl top-10 left-1/2" > </div>

            {/* Content */}
            <div className="h-full w-full z-10 absolute flex lg:flex-row flex-col lg:gap-0 gap-8 lg:justify-between justify-center p-4 items-center ">
                
                {/* Left text section */}
                <div className="flex flex-col gap-6 items-center lg:items-start lg:pl-10">
                    <div className="flex flex-col gap-1 text-center lg:text-left">
                        <h1 className="text-4xl 
                        drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]
                        lg:text-5xl font-bold bg-gradient-to-br bg-clip-text
                         text-transparent fade-in  from-blue-600 via-purple-600 to-pink-500">
                            Shop Smarter with <span className=" bg-clip-text bg-gradient-to-br from-yellow-300 to-pink-500 text-transparent">KIRAZON</span>
                        </h1>
                        <h2 className=" fade-in font-light text-md italic">
                            “Trendy items, smooth experience, fast delivery.”
                        </h2>
                    </div>
                    <button className="bg-gradient-to-br from-pink-400
                     via-pink-300 shadow-2xl 
                     rounded-xl text-white to-purple-500  px-6 py-3
                    hover:scale-110 transition-all duration-150 button-gradient " onClick={()=> Navigate('/products')}>
                        Shop Now
                    </button>
                </div>

                {/* Right icon section */}
                <div className="flex items-center justify-center lg:pr-20">
  <div className="relative flex items-center justify-center">
    <div className="absolute w-56 h-56 rounded-full bg-gradient-to-br from-pink-400 via-pink-300 to-purple-500 opacity-40 blur-3xl " />
    <div className="relative rounded-full p-6 animate-float hover-glow bg-white/30 backdrop-blur-md shadow-2xl">
      <svg width="140" height="140" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className=" transition-all duration-150 hover:animate-spin">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ec4899" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* simple bag body */}
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="url(#g)" strokeWidth="1.6" fill="none" />
        {/* handles */}
        <path d="M8 6V5a4 4 0 0 1 8 0v1" stroke="url(#g)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  </div>
</div>
</div>
</section>
     );
}

export default HeroSection;
