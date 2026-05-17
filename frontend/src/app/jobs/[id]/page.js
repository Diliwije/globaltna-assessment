// src/app/jobs/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getJobById, updateJobStatus, deleteJob } from '../../../services/api';

export default function JobDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);

  // Fetch job details when the component mounts or ID changes
  useEffect(() => {
    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const data = await getJobById(id);
      setJob(data);
    } catch (err) {
      setError('Failed to load job details. It might have been deleted.');
    } finally {
      setLoading(false);
    }
  };

  // Handle status update via dropdown
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatusUpdating(true);
    try {
      const updatedJob = await updateJobStatus(id, newStatus);
      setJob(updatedJob);
    } catch (err) {
      alert('Failed to update status. Please try again.');
    } finally {
      setStatusUpdating(false);
    }
  };

  // Handle job deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this request?');
    if (!confirmDelete) return;

    try {
      await deleteJob(id);
      router.push('/'); // Redirect to home after deletion
    } catch (err) {
      alert('Failed to delete job request.');
    }
  };

  // Render loading state
  if (loading) {
    return <div className="min-h-screen flex justify-center items-center text-gray-500">Loading details...</div>;
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Link href="/" className="text-blue-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  if (!job) return null;

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex justify-center">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md border border-gray-100">
        
        {/* Top Navigation and Actions */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
          <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
            &larr; Back to Board
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Status:</label>
              <select
                value={job.status}
                onChange={handleStatusChange}
                disabled={statusUpdating}
                className={`border rounded-md p-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer ${
                  job.status === 'Open' ? 'bg-green-50 text-green-800 border-green-200' :
                  job.status === 'In Progress' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                  'bg-gray-50 text-gray-800 border-gray-200'
                }`}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            
            <button
              onClick={handleDelete}
              className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-100 transition border border-red-100"
            >
              Delete Request
            </button>
          </div>
        </div>

        {/* Job Content */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded">
              {job.category || 'General'}
            </span>
            <span className="text-gray-400 text-sm">
              Posted on {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>
          <div className="bg-gray-50 p-5 rounded-md border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Location</h3>
            <p className="text-gray-800">{job.location || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Contact Details</h3>
            <p className="text-gray-800 mb-1">{job.contactName || 'No name provided'}</p>
            {job.contactEmail ? (
              <a href={`mailto:${job.contactEmail}`} className="text-blue-600 hover:underline">
                {job.contactEmail}
              </a>
            ) : (
              <p className="text-gray-500 italic text-sm">No email provided</p>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}