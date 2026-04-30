import FeatureCard from "./FeatureCard";
import { FaHeartbeat, FaPills, FaComments } from "react-icons/fa";

function FeaturesSection() {
  return (
    <section className="px-4 md:px-6 py-12 md:py-16 bg-gradient-to-b from-slate-100 to-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            Icon={FaHeartbeat}
            title="Symptom Checker"
            description="Identify potential health issues with our AI-powered diagnostic tool"
            button="Check Now →"
            link="/symptom-checker"
          />
          <FeatureCard
            Icon={FaPills}
            title="Medicine Checker"
            description="Get detailed information about medicines and their usage"
            button="Check Now →"
            link="/medicine-checker"
          />
          <FeatureCard
            Icon={FaComments}
            title="Mental Health Support"
            description="Get compassionate support from Dr. Serene, your AI therapist"
            button="Talk Now →"
            link="/mental-health-support"
          />
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;