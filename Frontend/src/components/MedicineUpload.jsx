import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import medicine from "../assets/medicine.jpg";

function MedicineUpload() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload an image first");
      return;
    }

    setLoading(true);

    try {
      // Create FormData to send file
      const formData = new FormData();
      formData.append("medicineImage", file);

      const response = await fetch("http://localhost:5000/api/medicine/analyze", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Medicine analyzed successfully!");
        setResult(data);
        console.log("Medicine analysis result:", data);
      } else {
        toast.error(data.message || "Failed to analyze medicine");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      console.error("Medicine analysis error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Image Preview */}
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt="preview"
            className="w-[420px] rounded shadow"
          />
          <button
            onClick={() => {
              setImage(null);
              setFile(null);
              setResult(null);
            }}
            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ) : (
        <img
          src={medicine}
          alt="medicine"
          className="w-[420px] rounded shadow"
        />
      )}

      {/* Upload Button */}
      <label className="bg-white px-12 py-4 rounded-xl shadow cursor-pointer flex flex-col items-center gap-2 hover:bg-gray-100 transition">
        <FaUpload className="text-blue-600 text-xl" />

        <span className="text-lg text-blue-700 font-medium">
          {image ? "Change Image" : "Upload Image of Medicine"}
        </span>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {/* Submit Button */}
      {image && (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-12 py-3 rounded-xl shadow-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Analyze Medicine"}
        </button>
      )}

      {/* Result Display */}
      {result && (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mt-4">
          <h4 className="text-lg font-semibold mb-4 text-blue-800">
            Analysis Result
          </h4>
          <div className="space-y-3">
            {result.medicineName && (
              <div>
                <span className="font-medium text-gray-700">Medicine Name:</span>
                <p className="text-gray-800 text-lg">{result.medicineName}</p>
              </div>
            )}
            {result.genericName && (
              <div>
                <span className="font-medium text-gray-700">Generic Name:</span>
                <p className="text-gray-600">{result.genericName}</p>
              </div>
            )}
            {result.uses && (
              <div>
                <span className="font-medium text-gray-700">Uses:</span>
                <p className="text-gray-600">{result.uses}</p>
              </div>
            )}
            {result.dosage && (
              <div>
                <span className="font-medium text-gray-700">Dosage:</span>
                <p className="text-gray-600">{result.dosage}</p>
              </div>
            )}
            {result.sideEffects && (
              <div>
                <span className="font-medium text-gray-700">Side Effects:</span>
                <p className="text-gray-600">{result.sideEffects}</p>
              </div>
            )}
            {result.warnings && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <span className="font-medium text-yellow-800">⚠️ Warnings:</span>
                <p className="text-yellow-700 mt-1">{result.warnings}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicineUpload;