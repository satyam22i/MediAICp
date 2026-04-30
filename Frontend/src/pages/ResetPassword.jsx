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

  // Get email passed from ForgotPassword page
  const email = location.state?.email;

  if (!email) {
    // If someone visits this URL directly without an email in state
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

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(AUTH_ENDPOINTS.resetPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
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
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
