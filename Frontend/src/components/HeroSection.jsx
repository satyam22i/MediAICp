import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="text-center py-12 md:py-20 px-4 bg-gradient-to-b from-blue-50 to-slate-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-3 md:mb-4 leading-tight">
          Your AI Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Companion</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
          Check your symptoms, identify medicines, and get mental health support all in one place. Powered by advanced AI technology.
        </p>
        <Link to="/signup">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition font-semibold text-sm md:text-base">
            Get Started →
          </button>
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;