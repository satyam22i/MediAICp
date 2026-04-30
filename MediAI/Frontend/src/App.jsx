import Landing from "./pages/Landing.jsx";
import SymptomChecker from "./pages/SymptomChecker.jsx";
import MedicineChecker from "./pages/MedicineChecker.jsx";
import MedicalAnalysis from "./pages/MedicalAnalysis.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import MentalHealthSupport from "./pages/MentalHealthSupport.jsx"
import VerifyEmail from "./pages/VerifyEmail.jsx"
import ForgotPassword from "./pages/ForgotPassword.jsx"
import ResetPassword from "./pages/ResetPassword.jsx"

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/symptom-checker",
      element: <SymptomChecker />,
    },
    {
      path: "/medicine-checker",
      element: <MedicineChecker />,
    },
    {
      path: "/medical-analysis",
      element: <MedicalAnalysis />,
    },
    {
      path: "/mental-health-support",
      element: <MentalHealthSupport />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/verify-email",
      element: <VerifyEmail />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    }
  ]);

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
