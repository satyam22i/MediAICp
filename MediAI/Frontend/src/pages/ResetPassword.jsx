import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../config/api";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [slowServer, setSlowServer] = useState(false);

  // Get email passed from ForgotPassword page
  const email = location.state?.email;

  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex flex-col items-center justify-center px-4">
        <p className="text-gray-600 mb-4 text-center">Please request an OTP first.</p>
        <button onClick={() => navigate("/forgot-password")} className="text-blue-600 font-bold hover:underline">
          Go to Forgot Password
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.otp || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.otp.length !== 6) {
      toast.error("OTP must be exactly 6 digits");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
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

      const response = await fetch(AUTH_ENDPOINTS.resetPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error("Request timed out. Server may be starting up — please try again.");
      } else {
        toast.error("Network error. Please check your connection and try again.");
      }
      console.error("Reset password error:", error);
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
              Set New Password
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm text-center">
              Enter the 6-digit OTP sent to <b className="break-all">{email}</b> and your new password.
            </p>
            <p className="text-xs text-blue-600 mt-2 text-center">
              💡 Check your spam/junk folder if you don't see it in inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono font-bold tracking-widest text-lg">
                #
              </span>
              <input
                type="text"
                name="otp"
                placeholder="6-Digit OTP"
                value={formData.otp}
                onChange={handleChange}
                maxLength="6"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 sm:py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base text-gray-700 tracking-[0.5em] font-mono"
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                🔒
              </span>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 sm:py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base text-gray-700"
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                🔒
              </span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 sm:py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base text-gray-700"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all text-sm sm:text-base disabled:from-blue-400 disabled:to-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? (slowServer ? "⏳ Server starting up..." : "Resetting...") : "Reset Password"}
            </button>

            {slowServer && (
              <p className="text-center text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                🔄 Server is waking up (free tier). This may take up to 30 seconds — please wait...
              </p>
            )}
          </form>

          <p className="text-center text-xs sm:text-sm mt-4 text-gray-600">
            Didn't receive OTP?{" "}
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-blue-600 font-medium hover:underline"
            >
              Request again
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
