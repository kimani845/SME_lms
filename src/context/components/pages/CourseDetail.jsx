import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import { Clock, BookOpen, CheckCircle, PlayCircle, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const [courseRes, myCoursesRes] = await Promise.all([
        coursesAPI.getCourse(id),
        coursesAPI.getMyCourses(),
      ]);

      setCourse(courseRes.data);
      
      // Check if enrolled
      const enrolled = myCoursesRes.data.find(p => p.course_id === parseInt(id));
      setProgress(enrolled);
      
      // Set first incomplete module as active
      if (enrolled && courseRes.data.modules.length > 0) {
        const firstIncomplete = courseRes.data.modules.find(m => !m.is_completed);
        setActiveModule(firstIncomplete || courseRes.data.modules[0]);
      }
    } catch (error) {
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await coursesAPI.enrollInCourse(id);
      toast.success('Successfully enrolled!');
      fetchCourseDetails();
    } catch (error) {
      toast.error('Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  const handleCompleteModule = async (moduleId) => {
    try {
      await coursesAPI.completeModule(moduleId);
      toast.success('Module completed! 🎉');
      fetchCourseDetails();
    } catch (error) {
      toast.error('Failed to mark as complete');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Course not found</p>
          <button
            onClick={() => navigate('/courses')}
            className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => navigate('/courses')}
            className="text-white hover:text-primary-100 mb-4 flex items-center"
          >
            ← Back to Courses
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <span className="px-3 py-1 bg-white/20 text-white text-sm font-semibold rounded-full">
                {course.category.replace('_', ' ').toUpperCase()}
              </span>
              <h1 className="text-4xl font-bold mt-4 mb-4">{course.title}</h1>
              <p className="text-primary-100 text-lg mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Clock size={18} className="mr-2" />
                  <span>{course.estimated_duration} minutes</span>
                </div>
                <div className="flex items-center">
                  <BookOpen size={18} className="mr-2" />
                  <span>{course.modules.length} modules</span>
                </div>
                <div className="flex items-center capitalize">
                  {course.difficulty_level}
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              {progress ? (
                <div>
                  <h3 className="text-xl font-bold mb-4">Your Progress</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completion</span>
                      <span className="font-semibold">{progress.completion_percentage}%</span>
                    </div>
                    <div className="bg-white/20 rounded-full h-3">
                      <div
                        className="bg-white rounded-full h-3 transition-all duration-300"
                        style={{ width: `${progress.completion_percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  {progress.is_completed ? (
                    <div className="bg-green-500 text-white px-4 py-3 rounded-lg flex items-center">
                      <CheckCircle size={20} className="mr-2" />
                      <span>Course Completed!</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveModule(course.modules[0])}
                      className="w-full bg-white text-primary-600 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                    >
                      Continue Learning
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
                  <p className="text-primary-100 mb-4">
                    Enroll now to access all course materials and track your progress.
                  </p>
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full bg-white text-primary-600 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors disabled:opacity-50"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Course Modules</h2>
              <div className="space-y-2">
                {course.modules.sort((a, b) => a.order - b.order).map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeModule?.id === module.id
                        ? 'bg-primary-50 border-2 border-primary-600'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          module.is_completed
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {module.is_completed ? (
                            <CheckCircle size={16} />
                          ) : (
                            <span className="text-sm font-semibold">{index + 1}</span>
                          )}
                        </div>
                        <span className="font-medium text-gray-800">{module.title}</span>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Module Content */}
          <div className="lg:col-span-2">
            {activeModule ? (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{activeModule.title}</h2>
                
                {activeModule.video_url && (
                  <div className="mb-6">
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <PlayCircle size={64} className="text-gray-400" />
                      <p className="text-gray-600 ml-4">Video: {activeModule.video_url}</p>
                    </div>
                  </div>
                )}

                <div className="prose prose-lg max-w-none mb-8">
                  <ReactMarkdown>{activeModule.content}</ReactMarkdown>
                </div>

                {activeModule.quiz_questions && activeModule.quiz_questions.length > 0 && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">📝 Quiz</h3>
                    <p className="text-gray-600 mb-4">
                      Test your knowledge with {activeModule.quiz_questions.length} questions
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Take Quiz
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center pt-6 border-t">
                  <button
                    onClick={() => {
                      const currentIndex = course.modules.findIndex(m => m.id === activeModule.id);
                      if (currentIndex > 0) {
                        setActiveModule(course.modules[currentIndex - 1]);
                      }
                    }}
                    className="text-gray-600 hover:text-gray-800"
                    disabled={course.modules[0].id === activeModule.id}
                  >
                    ← Previous Module
                  </button>

                  {!activeModule.is_completed && progress && (
                    <button
                      onClick={() => handleCompleteModule(activeModule.id)}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center"
                    >
                      <CheckCircle size={20} className="mr-2" />
                      Mark as Complete
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const currentIndex = course.modules.findIndex(m => m.id === activeModule.id);
                      if (currentIndex < course.modules.length - 1) {
                        setActiveModule(course.modules[currentIndex + 1]);
                      }
                    }}
                    className="text-gray-600 hover:text-gray-800"
                    disabled={course.modules[course.modules.length - 1].id === activeModule.id}
                  >
                    Next Module →
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Select a module to start learning</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;