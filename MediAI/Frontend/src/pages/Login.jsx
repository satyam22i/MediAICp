import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../config/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [slowServer, setSlowServer] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    setSlowServer(false);

    // Show "server waking up" message after 5 seconds (Render cold start)
    const slowTimer = setTimeout(() => {
      setSlowServer(true);
    }, 5000);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

      const response = await fetch(AUTH_ENDPOINTS.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/");
      } else if (response.status === 401) {
        // Could be unverified email OR wrong credentials
        toast.error(data.message || "Invalid email or password");
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error("Request timed out. The server may be starting up — please try again.");
      } else {
        toast.error("Network error. Please check your connection and try again.");
      }
      console.error("Login error:", error);
    } finally {
      clearTimeout(slowTimer);
      setLoading(false);
      setSlowServer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <Navbar />

      {/* Center container */}
      <div className="flex justify-center items-center py-8 sm:py-12 md:py-20 px-4">
        {/* Card */}
        <div className="bg-white w-full max-w-sm sm:max-w-md rounded-xl shadow-lg px-6 sm:px-10 py-10">
          
          {/* Logo and Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 text-blue-600 text-xl font-bold mb-3">
              <span className="text-3xl">➕</span>
              <span className="text-xl sm:text-2xl">MediAI</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 text-center">
              Welcome to MediAI
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm text-center">
              AI Powered Healthcare Solutions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                👤
              </span>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 sm:py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base text-gray-700"
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                🔒
              </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 sm:py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base text-gray-700"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs sm:text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all text-sm sm:text-base disabled:from-blue-400 disabled:to-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? (slowServer ? "⏳ Server starting up..." : "Logging in...") : "Login"}
            </button>

            {/* Cold start warning */}
            {slowServer && (
              <p className="text-center text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-1">
                🔄 Server is waking up (free tier). This may take up to 30 seconds — please wait...
              </p>
            )}
          </form>

          {/* Signup link */}
          <p className="text-center text-xs sm:text-sm mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;