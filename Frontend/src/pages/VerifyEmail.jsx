import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus('error');
        return;
      }

      try {
        const response = await fetch(`https://mediai-1hpm.onrender.com/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          toast.success("Email verified successfully!");
        } else {
          setStatus('error');
          toast.error(data.message || "Verification failed");
        }
      } catch (error) {
        setStatus('error');
        toast.error("Network error. Please try again.");
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-6 sm:p-10 text-center border border-slate-100">
          {status === 'verifying' && (
            <div className="flex flex-col items-center">
              <Loader2 className="w-12 sm:w-16 h-12 sm:h-16 text-blue-600 animate-spin mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Verifying your email</h2>
              <p className="text-slate-500 text-sm sm:text-base">Please wait while we confirm your account...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center">
              <CheckCircle className="w-12 sm:w-16 h-12 sm:h-16 text-green-500 mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Email Verified!</h2>
              <p className="text-slate-500 text-sm sm:text-base mb-6 sm:mb-8">Your account has been successfully activated. You can now login to access all features.</p>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 sm:py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
              >
                Go to Login
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center">
              <XCircle className="w-12 sm:w-16 h-12 sm:h-16 text-red-500 mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Verification Failed</h2>
              <p className="text-slate-500 text-sm sm:text-base mb-6 sm:mb-8">The verification link is invalid or has expired. Please try signing up again or contact support.</p>
              <button
                onClick={() => navigate('/signup')}
                className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold py-3 sm:py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
              >
                Back to Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
