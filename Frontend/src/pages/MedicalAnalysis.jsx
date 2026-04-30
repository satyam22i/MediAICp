import Navbar from "../components/Navbar";
import MedicalUpload from "../components/MedicalUpload";

function MedicalAnalysis() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100">

      <Navbar />

      <div className="flex justify-center py-8 md:py-16 px-4">

        <div className="w-full max-w-2xl">

          <h2 className="text-2xl md:text-3xl text-blue-900 font-bold mb-6 md:mb-8 text-center">
            Medical Data Analysis
          </h2>

          <MedicalUpload />

        </div>

      </div>

    </div>
  );
}

export default MedicalAnalysis;