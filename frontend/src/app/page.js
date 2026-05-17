// src/app/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getJobs } from '../services/api';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const [searchQuery, setSearchQuery] = useState(''); // State to trigger search
  const [loading, setLoading] = useState(true);

  // Fetch jobs when component mounts, filters change, or search query changes
  useEffect(() => {
    fetchJobs();
  }, [categoryFilter, statusFilter, searchQuery]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await getJobs(categoryFilter, statusFilter, searchQuery);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  // Handle clearing the search
  const clearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Service Request Board</h1>
          <Link 
            href="/new" 
            className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition font-medium shadow-sm"
          >
            Post a Request
          </Link>
        </div>

        {/* Filters and Search Section */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Category</label>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-md p-2 min-w-[160px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Painting">Painting</option>
                <option value="Joinery">Joinery</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Status</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md p-2 min-w-[160px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-auto flex-1 max-w-md">
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Search</label>
            <form onSubmit={handleSearchSubmit} className="relative flex">
              <input 
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full border border-gray-300 rounded-l-md p-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchInput && (
                <button 
                  type="button" 
                  onClick={clearSearch}
                  className="absolute right-[80px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
              <button 
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Job List Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 font-medium">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 mb-4">No job requests found matching your criteria.</p>
            {(searchQuery || categoryFilter || statusFilter) && (
              <button 
                onClick={() => {
                  setCategoryFilter('');
                  setStatusFilter('');
                  clearSearch();
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded">
                    {job.category || 'General'}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded ${
                    job.status === 'Open' ? 'bg-green-100 text-green-800' :
                    job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{job.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{job.description}</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    📍 {job.location || 'Anywhere'}
                  </span>
                  <Link 
                    href={`/jobs/${job._id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}