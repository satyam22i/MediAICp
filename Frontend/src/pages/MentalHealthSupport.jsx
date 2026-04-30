import React from "react";
import Navbar from "../components/Navbar";
import MentalHealthBot from "../components/MentalHealthBot";
import { ArrowLeft, Heart, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MentalHealthSupport() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-teal-600 flex items-center gap-2 font-medium transition-colors shrink-0 text-sm md:text-base"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </button>
          <h2 className="font-bold text-lg md:text-xl text-teal-900 text-center">
            Mental Health Support
          </h2>
          <div className="w-20 shrink-0"></div> {/* Spacer */}
        </div>
      </div>

      <div className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 py-6 md:py-10 flex flex-col items-center">
        
        {/* Intro */}
        <div className="text-center mb-6 md:mb-8 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 md:mb-4 text-slate-900 leading-tight">
            You don't have to face it <br className="hidden sm:block" />
            <span className="text-teal-600">alone</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed">
            Talk to Dr. Serene, your empathetic AI companion. Share your thoughts, manage stress, and explore personalized coping strategies in a judgment-free zone.
          </p>
        </div>

        {/* Benefits text */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-6 mb-6 md:mb-8 w-full">
          <div className="flex items-center gap-2 bg-white px-4 md:px-5 py-2 md:py-2.5 rounded-full shadow-sm border border-gray-200 text-teal-700 font-semibold text-sm md:text-base justify-center flex-1 sm:flex-none">
            <Heart size={18} className="shrink-0" /> Empathetic Listening
          </div>
          <div className="flex items-center gap-2 bg-white px-4 md:px-5 py-2 md:py-2.5 rounded-full shadow-sm border border-gray-200 text-blue-700 font-semibold text-sm md:text-base justify-center flex-1 sm:flex-none">
            <Shield size={18} className="shrink-0" /> 100% Private
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-full max-w-3xl">
          <MentalHealthBot />
        </div>
        
        <p className="text-xs sm:text-sm text-gray-400 mt-6 md:mt-8 text-center max-w-xl px-2">
          Disclaimer: Dr. Serene is an AI therapist and not a human professional. 
          If you are experiencing a crisis, please reach out to an emergency helpline or a licensed professional in your area.
        </p>

      </div>
    </div>
  );
}

export default MentalHealthSupport;
