import { Link } from "react-router-dom";

function FeatureCard({ Icon, title, description, button, link }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full">
      <div className="flex justify-center mb-4">
        <Icon className="text-3xl md:text-4xl text-blue-600" />
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 text-center">
        {title}
      </h3>
      <p className="text-gray-500 text-sm md:text-base mb-6 text-center leading-relaxed">
        {description}
      </p>
      <Link to={link}>
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 md:py-3 rounded-md hover:shadow-lg transition-all font-semibold text-sm md:text-base">
          {button}
        </button>
      </Link>
    </div>
  );
}

export default FeatureCard;