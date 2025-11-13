import React, { useEffect, useState } from 'react';
import { aiMentorAPI } from '../services/api';
import { TrendingUp, Award, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import toast from 'react-hot-toast';

const InvestorScore = () => {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);

  useEffect(() => {
    fetchScore();
  }, []);

  const fetchScore = async () => {
    try {
      const response = await aiMentorAPI.getInvestorScore();
      setScore(response.data);
    } catch (error) {
      // Score might not exist yet
      if (error.response?.status !== 404) {
        toast.error('Failed to load investor score');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRecalculate = async () => {
    setRecalculating(true);
    try {
      const response = await aiMentorAPI.recalculateScore();
      setScore(response.data);
      toast.success('Score updated!');
    } catch (error) {
      toast.error('Failed to recalculate score');
    } finally {
      setRecalculating(false);
    }
  };

  const getReadinessColor = (level) => {
    const colors = {
      highly_ready: '#10b981',
      ready: '#3b82f6',
      needs_improvement: '#f59e0b',
      not_ready: '#ef4444',
    };
    return colors[level] || '#gray-400';
  };

  const getReadinessLabel = (level) => {
    const labels = {
      highly_ready: 'Highly Ready',
      ready: 'Ready',
      needs_improvement: 'Needs Improvement',
      not_ready: 'Not Ready',
    };
    return labels[level] || 'Unknown';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Calculating your score...</p>
        </div>
      </div>
    );
  }

  if (!score) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <TrendingUp size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Score Yet</h2>
          <p className="text-gray-600 mb-6">
            Complete some courses and modules to generate your investor readiness score.
          </p>
          <button
            onClick={handleRecalculate}
            disabled={recalculating}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {recalculating ? 'Calculating...' : 'Calculate Score'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Investor Readiness Score</h1>
              <p className="text-gray-600">See how ready you are to attract investors</p>
            </div>
            <button
              onClick={handleRecalculate}
              disabled={recalculating}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw size={18} className={recalculating ? 'animate-spin' : ''} />
              <span>Recalculate</span>
            </button>
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <div style={{ width: 250, height: 250 }}>
                <CircularProgressbar
                  value={score.overall_score}
                  text={`${score.overall_score.toFixed(1)}`}
                  styles={buildStyles({
                    textSize: '24px',
                    pathColor: getReadinessColor(score.readiness_level),
                    textColor: '#1f2937',
                    trailColor: '#e5e7eb',
                  })}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-3 mb-6">
                <Award size={32} style={{ color: getReadinessColor(score.readiness_level) }} />
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {getReadinessLabel(score.readiness_level)}
                  </h2>
                  <p className="text-gray-600">Overall readiness level</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Education Score</span>
                    <span className="font-semibold">{score.education_score.toFixed(0)}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${score.education_score}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Financial Literacy</span>
                    <span className="font-semibold">{score.financial_literacy_score.toFixed(0)}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full">
                        style={{ width: `${score.financial_literacy_score}%` }}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Business Model</span>
                    <span className="font-semibold">{score.business_model_score.toFixed(0)}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${score.business_model_score}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Sustainability</span>
                    <span className="font-semibold">{score.sustainability_score.toFixed(0)}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${score.sustainability_score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strengths */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="text-green-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Strengths</h2>
            </div>
            <ul className="space-y-3">
              {score.strengths && score.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
              {(!score.strengths || score.strengths.length === 0) && (
                <li className="text-gray-500 italic">Complete more courses to identify strengths</li>
              )}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="text-orange-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Areas to Improve</h2>
            </div>
            <ul className="space-y-3">
              {score.weaknesses && score.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-2">!</span>
                  <span className="text-gray-700">{weakness}</span>
                </li>
              ))}
              {(!score.weaknesses || score.weaknesses.length === 0) && (
                <li className="text-gray-500 italic">Great job! Keep building your skills.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="mr-2 text-blue-600" size={28} />
            AI Recommendations
          </h2>
          <div className="space-y-3">
            {score.recommendations && score.recommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
            {(!score.recommendations || score.recommendations.length === 0) && (
              <p className="text-gray-600 italic">
                Continue learning to receive personalized recommendations
              </p>
            )}
          </div>
        </div>

        {/* What This Means */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What This Means</h2>
          <div className="prose prose-lg">
            <p className="text-gray-700">
              Your investor readiness score is calculated based on your completed courses, 
              quiz performance, and demonstrated understanding of key business concepts. 
              Investors typically look for:
            </p>
            <ul className="text-gray-700 mt-4 space-y-2">
              <li><strong>Financial Literacy:</strong> Understanding of cash flow, budgeting, and financial planning</li>
              <li><strong>Business Model:</strong> Clear value proposition and sustainable revenue streams</li>
              <li><strong>Scalability:</strong> Growth potential and market opportunity</li>
              <li><strong>Sustainability:</strong> Long-term viability and responsible practices</li>
            </ul>
            <div className="mt-6 p-4 bg-primary-50 rounded-lg border-l-4 border-primary-600">
              <p className="text-primary-800 font-semibold">
                💡 Keep learning and completing courses to improve your score and attract potential investors!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorScore;