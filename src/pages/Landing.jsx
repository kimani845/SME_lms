import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, TrendingUp, Smartphone, Globe, Phone, CheckCircle, ArrowRight, Lightbulb, Zap, Users } from 'lucide-react'; // Added Lightbulb, Zap, Users for potential future use or alternative icons

const Landing = () => {
  return (
    <div className="min-h-screen antialiased bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Subtle background pattern or texture for visual interest */}
          <svg className="w-full h-full" fill="none" viewBox="0 0 1600 900">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M80 0L0 0 0 80" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center justify-center text-center z-10">
  <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2 rounded-full mb-6 shadow-lg transform transition duration-500 hover:scale-105 animate-fade-in-up">
            New! AI-Powered Business Insights
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-up delay-100">
            Empower Your Business <br className="hidden md:inline" /> with Intelligent Guidance
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-4xl mx-auto animate-fade-in-up delay-200">
            Join thousands of ambitious Kenyan Small Venture Entrepreneurs transforming their ventures through{' '}
            <span className="font-semibold text-white">cutting-edge education, mentorship,</span> and{' '}
            <span className="font-semibold text-white">AI-powered strategies</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up delay-300">
            <Link
              to="/register"
              className="group relative inline-flex items-center justify-center px-10 py-4 rounded-full text-lg font-bold bg-white text-blue-700 shadow-xl hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Your Foundation for Business Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive tools and guidance designed for every stage of your entrepreneurial journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature Card 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-md">
                <BookOpen className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert-Led Courses</h3>
              <p className="text-gray-700 mb-5 leading-relaxed">
                Master essential skills in financial literacy, strategic scaling, and sustainable practices with
                courses crafted by industry leaders.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  Personalized learning paths
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  Engaging, interactive quizzes
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  Actionable progress tracking
                </li>
              </ul>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 shadow-md">
                <MessageCircle className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Business Mentor</h3>
              <p className="text-gray-700 mb-5 leading-relaxed">
                Receive immediate, intelligent guidance and insights from your personal AI business mentor,
                available 24/7.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  Real-time problem solving
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  Context-aware strategic advice
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  Multilingual support (English & Swahili)
                </li>
              </ul>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 shadow-md">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Investor Readiness Score</h3>
              <p className="text-gray-700 mb-5 leading-relaxed">
                Evaluate your business's potential to attract investors and secure crucial funding with our
                AI-driven scoring system.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  Comprehensive readiness assessment
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  AI-powered insights & feedback
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  Personalized actionable recommendations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Channel Access */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Seamless Learning, Wherever You Are
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access invaluable business insights and training through channels designed for every Kenyan entrepreneur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Channel Card 1 */}
            <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 text-center border-b-4 border-blue-600">
              <Globe className="mx-auto text-blue-600 mb-6" size={56} strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Intuitive Web Platform</h3>
              <p className="text-gray-700 leading-relaxed">
                Experience a rich, full-featured learning environment complete with video lectures, interactive
                quizzes, and detailed content modules.
              </p>
            </div>

            {/* Channel Card 2 */}
            <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 text-center border-b-4 border-green-600">
              <Smartphone className="mx-auto text-green-600 mb-6" size={56} strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Engaging WhatsApp Bot</h3>
              <p className="text-gray-700 leading-relaxed">
                Learn on the go through interactive conversational chat, making business education accessible and
                convenient for busy entrepreneurs.
              </p>
            </div>

            {/* Channel Card 3 */}
            <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 text-center border-b-4 border-purple-600">
              <Phone className="mx-auto text-purple-600 mb-6" size={56} strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Offline USSD Access</h3>
              <p className="text-gray-700 leading-relaxed">
                Continue your learning journey even without internet connectivity using our simple USSD code:
                <span className="block font-semibold text-gray-900 mt-2">*384*123#</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how we're making a real difference in the lives of Kenyan entrepreneurs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div className="animate-fade-in-up delay-100">
              <div className="text-6xl font-extrabold mb-3 text-white">1,000+</div>
              <div className="text-xl text-blue-100 font-semibold">Active Learners</div>
            </div>
            <div className="animate-fade-in-up delay-200">
              <div className="text-6xl font-extrabold mb-3 text-white">50+</div>
              <div className="text-xl text-blue-100 font-semibold">Expert Courses</div>
            </div>
            <div className="animate-fade-in-up delay-300">
              <div className="text-6xl font-extrabold mb-3 text-white">24/7</div>
              <div className="text-xl text-blue-100 font-semibold">AI Mentorship</div>
            </div>
            <div className="animate-fade-in-up delay-400">
              <div className="text-6xl font-extrabold mb-3 text-white">47</div>
              <div className="text-xl text-blue-100 font-semibold">Counties Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Ready to Ignite Your Business Potential?
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Join a thriving community of Kenyan entrepreneurs who are building sustainable, scalable, and successful
            businesses with our innovative AI-powered platform.
          </p>
          <Link
            to="/register"
            className="group relative inline-flex items-center justify-center px-12 py-5 rounded-full text-xl font-bold bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Start Your Free Journey Today
            <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </Link>
          <p className="mt-6 text-gray-500 text-base">No credit card required • Unlock all core features</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-extrabold text-2xl">S</span>
                </div>
                <span className="text-3xl font-extrabold text-white">SME Platform</span>
              </Link>
              <p className="text-gray-400 leading-relaxed mt-4 max-w-md">
                Empowering Kenyan entrepreneurs with cutting-edge AI-powered education, mentorship, and tools for sustainable business growth.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-5 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Dashboard</Link></li>
                <li><Link to="/courses" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Courses</Link></li>
                <li><Link to="/mentor" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">AI Mentor</Link></li>
                <li><Link to="/investor-score" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Investor Score</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-5 text-white">Contact & Info</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Contact Support</Link></li>
                <li>Email: <a href="mailto:info@smeplatform.co.ke" className="hover:text-blue-400">info@smeplatform.co.ke</a></li>
                <li>Phone: <a href="tel:+254700000000" className="hover:text-blue-400">+254 700 000 000</a></li>
                <li>USSD: <span className="font-semibold">*384*123#</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Mwamko. All rights reserved.</p>
            <p className="mt-2">Developed with ❤️ for Kenyan Entrepreneurs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;