import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import { Clock, TrendingUp, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const Courses = () => {
  const [courses, setallCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    stage: '',
    search: '',
  });

  const categories = ['financial_literacy', 'scalability', 'sustainability'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];
  const stages = ['idea', 'startup', 'growth', 'expansion'];

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, courses]);

  const fetchCourses = async () => {
    try {
      const response = await coursesAPI.getAllCourses();
      setAllCourses(response.data);
      setFilteredCourses(response.data);
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...courses];

    if (filters.category) {
      filtered = filtered.filter(c => c.category === filters.category);
    }
    if (filters.difficulty) {
      filtered = filtered.filter(c => c.difficulty_level === filters.difficulty);
    }
    if (filters.stage) {
      filtered = filtered.filter(c => c.target_stage === filters.stage);
    }
    if (filters.search) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Courses</h1>
          <p className="text-gray-600">Discover courses tailored to your business needs</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>

            {/* Difficulty */}
            <select
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Levels</option>
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
            {Object.values(filters).some(v => v) && (
              <button
                onClick={() => setFilters({ category: '', difficulty: '', stage: '', search: '' })}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">No courses found matching your filters</p>
            <button
              onClick={() => setFilters({ category: '', difficulty: '', stage: '', search: '' })}
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="h-48 bg-gray-200">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                  <p className="text-gray-600">{course.description}</p>
                </div>  
                <div className="px-6 pb-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>{course.duration} min</span>
                    </div>      
                    <div className="flex items-center space-x-2">
                        <TrendingUp size={16} />
                        <span>{course.difficulty_level.charAt(0).toUpperCase() + course.difficulty_level.slice(1)}</span>
                    </div>
                </div>
              </Link>
            ))}
            </div>
            )}
        </div>
    </div>
    );
    }
export default Courses;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { coursesAPI } from '../services/api';
// import { Clock, TrendingUp, Search, Filter } from 'lucide-react';
// import toast from 'react-hot-toast';

// const Courses = () => {
//   const [courses, setallCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     category: '',
//     difficulty: '',
//     stage: '',
//     search: '',
//   });

//   const categories = ['financial_literacy', 'scalability', 'sustainability'];
//   const difficulties = ['beginner', 'intermediate', 'advanced'];
//   const stages = ['idea', 'startup', 'growth', 'expansion'];

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [filters, courses]);

//   const fetchCourses = async () => {
//     try {
//       const response = await coursesAPI.getAllCourses();
//       setAllCourses(response.data);
//       setFilteredCourses(response.data);
//     } catch (error) {
//       toast.error('Failed to load courses');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applyFilters = () => {
//     let filtered = [...courses];

//     if (filters.category) {
//       filtered = filtered.filter(c => c.category === filters.category);
//     }
//     if (filters.difficulty) {
//       filtered = filtered.filter(c => c.difficulty_level === filters.difficulty);
//     }
//     if (filters.stage) {
//       filtered = filtered.filter(c => c.target_stage === filters.stage);
//     }
//     if (filters.search) {
//       filtered = filtered.filter(c =>
//         c.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//         c.description.toLowerCase().includes(filters.search.toLowerCase())
//       );
//     }

//     setFilteredCourses(filtered);
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters({ ...filters, [key]: value });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading courses...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Courses</h1>
//           <p className="text-gray-600">Discover courses tailored to your business needs</p>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {/* Search */}
//             <div className="md:col-span-2">
//               <div className="relative">
//                 <Search className="absolute left-3 top-3 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder="Search courses..."
//                   value={filters.search}
//                   onChange={(e) => handleFilterChange('search', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Category */}
//             <select
//               value={filters.category}
//               onChange={(e) => handleFilterChange('category', e.target.value)}
//               className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             >
//               <option value="">All Categories</option>
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>
//                   {cat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
//                 </option>
//               ))}
//             </select>

//             {/* Difficulty */}
//             <select
//               value={filters.difficulty}
//               onChange={(e) => handleFilterChange('difficulty', e.target.value)}
//               className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             >
//               <option value="">All Levels</option>
//               {difficulties.map(diff => (
//                 <option key={diff} value={diff}>
//                   {diff.charAt(0).toUpperCase() + diff.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mt-4 flex items-center justify-between">
//             <p className="text-gray-600">
//               Showing {filteredCourses.length} of {courses.length} courses
//             </p>
//             {Object.values(filters).some(v => v) && (
//               <button
//                 onClick={() => setFilters({ category: '', difficulty: '', stage: '', search: '' })}
//                 className="text-primary-600 hover:text-primary-700 font-semibold"
//               >
//                 Clear Filters
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Courses Grid */}
//         {filteredCourses.length === 0 ? (
//           <div className="text-center py-12">
//             <Filter size={48} className="mx-auto text-gray-400 mb-4" />
//             <p className="text-gray-600 mb-4">No courses found matching your filters</p>
//             <button
//               onClick={() => setFilters({ category: '', difficulty: '', stage: '', search: '' })}
//               className="text-primary-600 hover:text-primary-700 font-semibold"
//             >
//               Clear Filters
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCourses.map((course) => (
//               <Link
//                 key={course.id}
//                 to={`/courses/${course.id}`}
//                 className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
//               >
//                 <div className="h-48 bg-gray-200">
//                     <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
//                   <span className="text-6xl">📚</span>
//                 </div>
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
//                       {course.category.replace('_', ' ').toUpperCase()}
//                     </span>
//                     <span className="text-xs text-gray-500 capitalize">{course.difficulty_level}</span>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
//                   <div className="flex items-center justify-between text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <Clock size={16} className="mr-1" />
//                       <span>{course.estimated_duration} min</span>
//                     </div>
//                     <div className="flex items-center">
//                       <TrendingUp size={16} className="mr-1" />
//                       <span className="capitalize">{course.target_stage}</span>
//                     </div>
//                   </div>
//                   <button className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
//                     Start Learning
//                   </button>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Courses;