import Navbar from "../components/Navbar";
import MedicineUpload from "../components/MedicineUpload";

function MedicineChecker() {
  return (
    <div className="min-h-screen bg-slate-200">

      <Navbar />

      <div className="flex justify-center py-16">

        <div className="bg-blue-100 w-[900px] p-12 rounded-md shadow">

          <MedicineUpload />

        </div>

      </div>

    </div>
  );
}

export default MedicineChecker;