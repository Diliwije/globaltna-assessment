'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getJobs } from '../services/api';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobsLoading, setJobsLoading] = useState(true);

  // Route protection redirect logic
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch jobs whenever filters or search query updates
  useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [categoryFilter, statusFilter, searchQuery, user]);

  const fetchJobs = async () => {
    setJobsLoading(true);
    try {
      // Fixed parameter order to strictly match api.js signature: (search, category, status)
      const data = await getJobs(searchQuery, categoryFilter, statusFilter);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setJobsLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
  };

  const getStatusPillClass = (status) => {
    if (status === 'Open') return 'pill-open';
    if (status === 'In Progress') return 'pill-progress';
    return 'pill-closed';
  };

  // Render safe loading UI while verifying auth state
  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center gap-3">
        <div
          style={{
            width: '36px',
            height: '36px',
            border: '3px solid #e5e7eb',
            borderTopColor: '#2563eb',
            borderRadius: '50%',
            animation: 'spin 0.75s linear infinite',
          }}
        />
        <p className="text-gray-500 text-sm font-medium">Checking authentication...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-canvas)' }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        className="animate-fade-up"
        style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-light)',
          padding: '1.75rem 2rem',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
            >
              GlobalTNA
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              Service Request Board
            </h1>
          </div>
          
          {/* User Session Info and Controls */}
          <div className="flex items-center flex-wrap sm:flex-nowrap gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-left sm:text-right">
              <p className="text-xs text-gray-400 font-medium">Logged in as</p>
              <p className="text-sm font-semibold text-gray-800">{user.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/new"
                className="btn-primary"
                style={{ whiteSpace: 'nowrap', padding: '0.65rem 1.4rem' }}
              >
                + Post a Request
              </Link>
              <button
                onClick={logout}
                className="px-3 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-md hover:bg-red-100 border border-red-200 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Page Body ───────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Filter & Search Bar ────────────────────────────────── */}
        <div
          className="card animate-fade-up stagger-1 mb-8"
          style={{ padding: '1.25rem 1.5rem' }}
        >
          <div className="flex flex-col md:flex-row gap-5 justify-between items-end">

            {/* Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="input-base select-input"
                  style={{ minWidth: '165px' }}
                >
                  <option value="">All Categories</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Painting">Painting</option>
                  <option value="Joinery">Joinery</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-base select-input"
                  style={{ minWidth: '165px' }}
                >
                  <option value="">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="flex flex-col gap-1.5 w-full md:max-w-sm">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Search
              </label>
              <form onSubmit={handleSearchSubmit} className="relative flex">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by title or description..."
                  className="input-base"
                  style={{
                    borderRadius: '8px 0 0 8px',
                    borderRight: 'none',
                    paddingRight: searchInput ? '2rem' : '0.85rem',
                  }}
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      right: '88px',
                      color: 'var(--text-muted)',
                      fontSize: '0.75rem',
                      lineHeight: 1,
                      padding: '0.2rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                )}
                <button
                  type="submit"
                  style={{
                    background: 'var(--accent)',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    padding: '0 1.1rem',
                    border: 'none',
                    borderRadius: '0 8px 8px 0',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.18s ease',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ── Job List ───────────────────────────────────────────── */}
        {jobsLoading ? (
          <div className="flex flex-col justify-center items-center py-28 gap-3">
            <div
              style={{
                width: '36px',
                height: '36px',
                border: '3px solid var(--border-light)',
                borderTopColor: 'var(--accent)',
                borderRadius: '50%',
                animation: 'spin 0.75s linear infinite',
              }}
            />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
              Loading requests…
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>

        ) : jobs.length === 0 ? (
          <div
            className="card animate-fade-up text-center"
            style={{ padding: '4rem 2rem' }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              No requests found matching your criteria.
            </p>
            {(searchQuery || categoryFilter || statusFilter) && (
              <button
                onClick={() => { setCategoryFilter(''); setStatusFilter(''); clearSearch(); }}
                style={{
                  color: 'var(--accent)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                Clear all filters
              </button>
            )}
          </div>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job, i) => (
              <div
                key={job._id}
                className="card animate-fade-up flex flex-col h-full"
                style={{
                  padding: '1.4rem 1.5rem 1.3rem',
                  animationDelay: `${0.05 + i * 0.04}s`,
                  opacity: 0,
                }}
              >
                {/* Pills row */}
                <div className="flex justify-between items-center mb-3">
                  <span className="pill-category">{job.category || 'General'}</span>
                  <span className={getStatusPillClass(job.status)}>{job.status}</span>
                </div>

                {/* Title */}
                <h2
                  className="line-clamp-2 mb-1"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.4,
                  }}
                >
                  {job.title}
                </h2>

                {/* Meta Row: Displays the creator user info */}
                <div className="text-[11px] font-medium text-gray-400 mb-3">
                  Posted by: <span className="text-gray-600 font-semibold">{job.user?.name || job.contactName || 'System'}</span>
                </div>

                {/* Description */}
                <p
                  className="line-clamp-3 text-sm mb-4"
                  style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}
                >
                  {job.description}
                </p>

                {/* Footer */}
                <div
                  className="mt-auto flex justify-between items-center pt-4"
                  style={{ borderTop: '1px solid var(--border-light)' }}
                >
                  <span
                    className="flex items-center gap-1 text-xs font-medium"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                      <path d="M6 0C3.79 0 2 1.79 2 4c0 3 4 8.5 4 8.5S10 7 10 4c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 6 2.5a1.5 1.5 0 0 1 0 3z" fill="currentColor"/>
                    </svg>
                    {job.location || 'Anywhere'}
                  </span>
                  <Link
                    href={`/jobs/${job._id}`}
                    className="link-accent"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                  >
                    View Details
                    <span aria-hidden="true" style={{ fontSize: '1rem' }}>→</span>
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