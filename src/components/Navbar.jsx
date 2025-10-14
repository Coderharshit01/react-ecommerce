import { ShoppingCart, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Navbar({user, handleLogin , handleLogout}) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative">
      <nav
        className={`fixed top-0 left-0 w-full z-50 p-2 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-lg bg-white/60 shadow-lg"
            : "bg-white shadow-xl"
        } flex items-center justify-between`}
      >
        <h2
          className="font-bold text-3xl bg-clip-text bg-gradient-to-br from-yellow-300 to-pink-500 text-transparent cursor-pointer"
          onClick={() => navigate("/")}
        >
          KIRAZON
        </h2>

        <div className="flex gap-3">
          <button
            className="rounded-full p-2 hover:bg-blue-200 text-gray-700"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={26} />
          </button>
         {user ? (
          <>
          <img src={user.photoURL} alt="Profile" 
          className="rounded-full w-10 h-10 cursor-pointer" onClick={()=>navigate(`/user/${user.uid}`)}/>
          </>
         ) : (
          <button
          className="rounded-lg  px-4 py-2 bg-blue-500 text-white"
         onClick={handleLogin}
        >
          Login
        </button>
         )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
