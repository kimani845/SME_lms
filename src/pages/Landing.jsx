import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, TrendingUp, Smartphone, Globe, Phone, CheckCircle } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-secondary-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Empower Your Business with AI
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Join thousands of Kenyan entrepreneurs transforming their businesses through 
              education, mentorship, and AI-powered guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools for every stage of your business journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Courses</h3>
              <p className="text-gray-700 mb-4">
                Learn financial literacy, business scaling, and sustainability from industry experts
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  Personalized learning paths
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  Interactive quizzes
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  Track your progress
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Mentor</h3>
              <p className="text-gray-700 mb-4">
                Get instant, personalized guidance from our AI business mentor 24/7
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  Real-time answers
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  Context-aware advice
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  Available in English & Swahili
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Investor Readiness</h3>
              <p className="text-gray-700 mb-4">
                Get scored on your readiness to attract investors and funding
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  Comprehensive scoring
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  AI-powered insights
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="text-green-500 mr-2" size={18} />
                  Actionable recommendations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Channel Access */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Learn Anywhere, Anytime
            </h2>
            <p className="text-xl text-gray-600">
              Access training through multiple channels designed for Kenyan entrepreneurs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <Globe className="mx-auto text-blue-600 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Web Platform</h3>
              <p className="text-gray-600">
                Full-featured learning experience with videos, quizzes, and interactive content
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <Smartphone className="mx-auto text-green-600 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">WhatsApp Bot</h3>
              <p className="text-gray-600">
                Learn through conversational chat, perfect for on-the-go entrepreneurs
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <Phone className="mx-auto text-purple-600 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">USSD Code</h3>
              <p className="text-gray-600">
                Access courses and check progress without internet using *384*123#
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">1,000+</div>
              <div className="text-primary-100">Active Learners</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Expert Courses</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">AI Mentorship</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">47</div>
              <div className="text-primary-100">Counties Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of Kenyan entrepreneurs who are building sustainable, 
            scalable businesses with our AI-powered platform
          </p>
          <Link
            to="/register"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition-colors"
          >
            Start Your Free Journey Today
          </Link>
          <p className="mt-4 text-gray-500">No credit card required • Access all features</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SME Training Platform</h3>
              <p className="text-gray-400">
                Empowering Kenyan entrepreneurs through AI-powered education and mentorship
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/courses" className="text-gray-400 hover:text-white">Courses</Link></li>
                <li><Link to="/mentor" className="text-gray-400 hover:text-white">AI Mentor</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@smeplatform.co.ke</li>
                <li>Phone: +254 700 000 000</li>
                <li>USSD: *384*123#</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SME Training Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;