import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../config/api";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [slowServer, setSlowServer] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    setSlowServer(false);

    const slowTimer = setTimeout(() => {
      setSlowServer(true);
    }, 5000);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(AUTH_ENDPOINTS.forgotPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error("Request timed out. Server may be starting up — please try again.");
      } else {
        toast.error("Network error. Please check your connection and try again.");
      }
      console.error("Forgot password error:", error);
    } finally {
      clearTimeout(slowTimer);
      setLoading(false);
      setSlowServer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-center py-8 sm:py-12 md:py-20 px-4">
        <div className="bg-white w-full max-w-sm sm:max-w-md rounded-xl shadow-lg px-6 sm:px-10 py-10">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 text-center">
              Reset Password
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm text-center">
              Enter your email address and we'll send you a 6-digit OTP to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                ✉️
              </span>
              <input
                type="email"
                placeholder="E-mail Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 sm:py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base text-gray-700"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all text-sm sm:text-base disabled:from-blue-400 disabled:to-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? (slowServer ? "⏳ Server starting up..." : "Sending OTP...") : "Send OTP"}
            </button>

            {/* Cold start warning */}
            {slowServer && (
              <p className="text-center text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                🔄 Server is waking up (free tier). This may take up to 30 seconds — please wait...
              </p>
            )}
          </form>

          <p className="text-center text-xs sm:text-sm mt-6 text-gray-600">
            Remember your password?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
