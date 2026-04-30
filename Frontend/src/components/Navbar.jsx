import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-10 py-4 bg-white shadow-sm sticky top-0 z-50">
      <Link to="/">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 text-lg md:text-xl font-bold">➕</span>
          <h1 className="text-lg md:text-xl font-semibold text-blue-700 tracking-tight">MediAI</h1>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 font-medium text-sm text-slate-600">
        <Link to="/symptom-checker" className="hover:text-blue-600 transition-colors">Symptom Checker</Link>
        <Link to="/medicine-checker" className="hover:text-blue-600 transition-colors">Medicine Checker</Link>
        <Link to="/mental-health-support" className="hover:text-teal-600 transition-colors">Mental Health</Link>
      </div>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex gap-3">
        {userInfo ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-700">Hi, {userInfo.name}</span>
            <button 
              onClick={logoutHandler}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 font-medium transition-colors"
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 text-sm">
                Log In
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 text-sm">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} className="md:hidden p-2">
        {isOpen ? (
          <X size={24} className="text-slate-700" />
        ) : (
          <Menu size={24} className="text-slate-700" />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg md:hidden">
          <div className="flex flex-col p-4 gap-4">
            <Link 
              to="/symptom-checker" 
              onClick={() => setIsOpen(false)}
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium py-2"
            >
              Symptom Checker
            </Link>
            <Link 
              to="/medicine-checker"
              onClick={() => setIsOpen(false)}
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium py-2"
            >
              Medicine Checker
            </Link>
            <Link 
              to="/mental-health-support"
              onClick={() => setIsOpen(false)}
              className="text-slate-600 hover:text-teal-600 transition-colors font-medium py-2"
            >
              Mental Health
            </Link>
            
            <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
              {userInfo ? (
                <>
                  <span className="text-sm font-semibold text-slate-700">Hi, {userInfo.name}</span>
                  <button 
                    onClick={() => {
                      logoutHandler();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 font-medium transition-colors"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 font-medium">
                      Log In
                    </button>
                  </Link>

                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 font-medium">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
