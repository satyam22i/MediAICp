import React from 'react';
import { Activity, Mail, Heart, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 text-center md:text-left">
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-xl text-white">
                <Activity size={24} />
              </div>
              <span className="font-bold text-xl md:text-2xl text-white tracking-tight">MediPredict AI</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed text-sm md:text-base">
              Your intelligent healthcare companion. Empowering you with AI-driven symptom analysis, medicine identification, and empathetic mental health support.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-300">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-300">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4 md:mb-6 uppercase tracking-wider text-xs md:text-sm">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/symptom-checker" className="hover:text-blue-400 transition-colors">Symptom Checker</Link></li>
              <li><Link to="/medicine-checker" className="hover:text-blue-400 transition-colors">Medicine Checker</Link></li>
              <li><Link to="/mental-health-support" className="hover:text-blue-400 transition-colors">Mental Health</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4 md:mb-6 uppercase tracking-wider text-xs md:text-sm">Support</h4>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><Link to="#" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-slate-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} MediPredict AI. All rights reserved.</p>
          <p className="flex items-center gap-1 justify-center">
            Built with <Heart size={14} className="text-red-500 fill-red-500" /> for better healthcare.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
