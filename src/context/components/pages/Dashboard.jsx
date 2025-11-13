import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { coursesAPI, aiMentorAPI } from '../services/api';
import { BookOpen, Award, TrendingUp, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [myCourses, setMyCourses] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [investorScore, setInvestorScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesRes, recommendedRes] = await Promise.all([
        coursesAPI.getMyCourses(),
        coursesAPI.getRecommendedCourses(),
      ]);

      setMyCourses(coursesRes.data);
      setRecommended(recommendedRes.data);

      // Try to get investor score
      try {
        const scoreRes = await aiMentorAPI.getInvestorScore();
        setInvestorScore(scoreRes.data);
      } catch (error) {
        // Score might not exist yet
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {getGreeting()}, {user?.full_name}! 👋
          </h1>
          <p className="text-primary-100">
            {user?.business_name ? `Managing ${user.business_name}` : 'Ready to build your business?'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <BookOpen className="text-primary-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{myCourses.length}</h3>
            <p className="text-gray-600">Enrolled Courses</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {myCourses.filter(c => c.is_completed).length}
            </h3>
            <p className="text-gray-600">Completed</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="text-yellow-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{user?.gamification_points || 0}</h3>
            <p className="text-gray-600">Points Earned</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {investorScore ? `${investorScore.overall_score.toFixed(0)}%` : 'N/A'}
            </h3>
            <p className="text-gray-600">Investor Score</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
                <Link to="/courses" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Browse All →
                </Link>
              </div>

              {myCourses.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
                  <Link
                    to="/courses"
                    className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
                  >
                    Explore Courses
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myCourses.map((progress) => (
                    <Link
                      key={progress.id}
                      to={`/courses/${progress.course_id}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{progress.course.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          progress.is_completed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {progress.is_completed ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{progress.course.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${progress.completion_percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {progress.completion_percentage}%
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended Courses */}
            {recommended.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Recommended for You 🎯
                </h2>
                <div className="space-y-4">
                  {recommended.slice(0, 3).map((course) => (
                    <Link
                      key={course.id}
                      to={`/courses/${course.id}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-gray-800 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-1" />
                        <span>{course.estimated_duration} minutes</span>
                        <span className="mx-2">•</span>
                        <span className="capitalize">{course.difficulty_level}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/mentor"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageCircle className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Ask AI Mentor</p>
                    <p className="text-sm text-gray-600">Get instant guidance</p>
                  </div>
                </Link>

                <Link
                  to="/investor-score"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Check Your Score</p>
                    <p className="text-sm text-gray-600">See investor readiness</p>
                  </div>
                </Link>

                <Link
                  to="/courses"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Browse Courses</p>
                    <p className="text-sm text-gray-600">Explore new topics</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Access Channels */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Learn Anywhere</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <p>💻 Web Platform</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <p>📱 WhatsApp: {user?.phone_number}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <p> USSD: *384*123#</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;