import { Link } from "react-router-dom";

function Navbar() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-sm">
      <Link to="/">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 text-xl font-bold">➕</span>
          <h1 className="text-xl font-semibold text-blue-700 tracking-tight">MediAI</h1>
        </div>
      </Link>

      <div className="hidden md:flex gap-8 font-medium text-sm text-slate-600">
        <Link to="/symptom-checker" className="hover:text-blue-600 transition-colors">Symptom Checker</Link>
        <Link to="/medicine-checker" className="hover:text-blue-600 transition-colors">Medicine Checker</Link>
        <Link to="/mental-health-support" className="hover:text-teal-600 transition-colors">Mental Health</Link>
      </div>

      <div className="flex gap-3">
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
              <button className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
                Log In
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
