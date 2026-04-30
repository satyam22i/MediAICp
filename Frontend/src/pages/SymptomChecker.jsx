import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import InteractiveAnatomy from "../components/InteractiveAnatomy";
import DoctorChatbot from "../components/DoctorChatbot";
import { useNavigate } from "react-router-dom";

function SymptomChecker() {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState("");

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);

  const handlePartClick = (part) => {
    setSelectedPart(part);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 font-sans text-slate-800 selection:bg-blue-200">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="mb-6 md:mb-8 text-center max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2 md:mb-3 text-slate-900">Where does it hurt?</h1>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed">
            Tap a specific area on the 3D body map, or describe your symptoms directly. Dr. AI will diagnose your condition instantly.
          </p>
        </div>

        {/* Single Cohesive Container */}
        <div className="w-full min-h-[600px] sm:min-h-[750px] md:min-h-[800px] bg-white/70 backdrop-blur-3xl border border-white/80 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden flex flex-col md:flex-row relative">

          {/* Decorative background orb inside container */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none hidden md:block"></div>

          {/* Left Column: 3D Body Map */}
          <div className="w-full md:w-[300px] lg:w-[350px] bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col items-center justify-center p-4 md:p-6 relative z-10 shrink-0">
            <div className="text-center mb-4 md:mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Interactive 3D Scan</p>
              <h3 className="font-semibold text-slate-700 text-sm md:text-base">Select an Area</h3>
            </div>

            <div className="flex-1 w-full relative min-h-[200px] md:min-h-[300px]">
              <InteractiveAnatomy onPartClick={handlePartClick} />
            </div>

            <div className="mt-4 md:mt-8 w-full bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-3 md:p-4 text-center shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Detected Area</p>
              <p className="text-blue-700 font-bold text-base md:text-lg">
                {selectedPart || "Scan pending..."}
              </p>
            </div>
          </div>

          {/* Right Column: Chatbot */}
          <div className="flex-1 relative z-10 p-2 md:p-4 min-h-[300px] md:min-h-auto">
            <div className="h-full bg-white/40 backdrop-blur-md border border-white/60 rounded-lg md:rounded-2xl shadow-sm overflow-hidden">
              <DoctorChatbot selectedPart={selectedPart} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SymptomChecker;