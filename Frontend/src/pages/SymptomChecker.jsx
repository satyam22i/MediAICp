import Navbar from "../components/Navbar";
import SymptomForm from "../components/SymptomForm";
import { useNavigate } from "react-router-dom";

function SymptomChecker() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-200">

      <Navbar />

      {/* Header */}
      <div className="bg-white border-b flex items-center justify-between px-10 py-4">

        <button
          onClick={() => navigate("/")}
          className="text-gray-700 flex items-center gap-2 hover:text-blue-600"
        >
          ← Back
        </button>

        <h2 className="font-semibold text-lg">
          AI Symptom Checker
        </h2>

        <div></div>

      </div>

      {/* Form Section */}
      <SymptomForm />

    </div>
  );
}

export default SymptomChecker;