import { useNavigate } from "react-router-dom";

function Profile({ user, handleLogOut }) {
    const navigate = useNavigate()
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="shadow-2xl w-[90%] md:w-[70%] lg:w-[50%] px-6 py-8 rounded-xl bg-white flex flex-col items-center gap-6">
          
          {/* Profile Image */}
          <img
            src={user.photoURL}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-red-400 object-cover"
          />
  
          {/* User Info */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 font-semibold">Name:</span>
              <input
                type="text"
                value={user.displayName}
                disabled
                className="border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
  
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 font-semibold">Email:</span>
              <input
                type="text"
                value={user.email}
                disabled
                className="border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
  
          {/* Logout Button */}
          <button
            onClick={()=>{
                navigate('/')
                handleLogOut()
            }}
            className="mt-4 w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
  
  export default Profile;
  