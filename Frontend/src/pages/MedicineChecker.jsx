import Navbar from "../components/Navbar";
import MedicineUpload from "../components/MedicineUpload";
import { Target, Zap, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MedicineChecker() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-slate-50 to-blue-50/50 font-sans text-slate-800 relative overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-[20%] right-[10%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-blue-200/40 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-200/30 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 md:mb-4 text-slate-900 leading-tight">
            Understand Your <br className="hidden sm:block" />
            <span className="text-blue-600">Medication Instantly</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed px-2">
            Upload an image or enter the name of your medicine. Our AI Pharmacist will extract essential information including uses, dosages, side effects, and strict warnings.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-8 mb-8 md:mb-12 px-2">
          <div className="flex items-center gap-2 text-slate-600 font-medium text-sm md:text-base bg-white/60 px-4 py-2 rounded-lg">
            <Target className="text-blue-500 shrink-0" size={20} /> Accurate Recognition
          </div>
          <div className="flex items-center gap-2 text-slate-600 font-medium text-sm md:text-base bg-white/60 px-4 py-2 rounded-lg">
            <Zap className="text-yellow-500 shrink-0" size={20} /> Instant Analysis
          </div>
          <div className="flex items-center gap-2 text-slate-600 font-medium text-sm md:text-base bg-white/60 px-4 py-2 rounded-lg">
            <ShieldCheck className="text-green-500 shrink-0" size={20} /> Safe Usage Guidelines
          </div>
        </div>

        <div className="flex justify-center px-2">
          <div className="w-full max-w-2xl">
            <MedicineUpload />
          </div>
        </div>

      </div>
    </div>
  );
}

export default MedicineChecker;