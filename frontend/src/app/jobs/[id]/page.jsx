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

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this request?');
    if (!confirmDelete) return;

    try {
      await deleteJob(id);
      router.push('/');
    } catch (err) {
      alert('Failed to delete job request.');
    }
  };

  // ── Loading ────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center gap-3"
        style={{ background: 'var(--bg-canvas)' }}
      >
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
          Loading details…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────
  if (error) {
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center gap-4"
        style={{ background: 'var(--bg-canvas)' }}
      >
        <div
          className="card text-center"
          style={{ padding: '2.5rem 2rem', maxWidth: '400px' }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚠️</div>
          <p style={{ color: '#C0392B', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
            {error}
          </p>
          <Link href="/" className="btn-primary" style={{ display: 'inline-block' }}>
            Return to Board
          </Link>
        </div>
      </div>
    );
  }

  if (!job) return null;

  const getStatusSelectStyle = (status) => {
    if (status === 'Open') return {
      background: 'var(--status-open-bg)',
      color: 'var(--status-open-text)',
      border: '1.5px solid var(--status-open-border)',
    };
    if (status === 'In Progress') return {
      background: 'var(--status-progress-bg)',
      color: 'var(--status-progress-text)',
      border: '1.5px solid var(--status-progress-border)',
    };
    return {
      background: 'var(--status-closed-bg)',
      color: 'var(--status-closed-text)',
      border: '1.5px solid var(--status-closed-border)',
    };
  };

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--bg-canvas)' }}
    >
      {/* ── Header bar ──────────────────────────────────────── */}
      <header
        className="animate-fade-up"
        style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-light)',
          padding: '1.1rem 2rem',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="link-back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Board
          </Link>
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
          >
            GlobalTNA
          </p>
        </div>
      </header>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="flex-1 flex justify-center px-4 sm:px-6 py-10">
        <div
          className="card animate-fade-up stagger-1 w-full"
          style={{ maxWidth: '760px', padding: '2.25rem 2.25rem 2.5rem' }}
        >

          {/* ── Top action bar ──────────────────────────────── */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6"
            style={{ borderBottom: '1px solid var(--border-light)' }}
          >
            {/* Meta: category + date */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="pill-category">{job.category || 'General'}</span>
              <span
                className="text-xs font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                Posted {new Date(job.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Status select */}
              <div className="flex items-center gap-2">
                <label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}
                >
                  Status
                </label>
                <select
                  value={job.status}
                  onChange={handleStatusChange}
                  disabled={statusUpdating}
                  style={{
                    ...getStatusSelectStyle(job.status),
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    padding: '0.3rem 1.8rem 0.3rem 0.7rem',
                    borderRadius: '100px',
                    outline: 'none',
                    cursor: statusUpdating ? 'not-allowed' : 'pointer',
                    opacity: statusUpdating ? 0.6 : 1,
                    transition: 'opacity 0.15s',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='currentColor' stroke-width='1.4' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.6rem center',
                  }}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Delete */}
              <button onClick={handleDelete} className="btn-danger">
                Delete Request
              </button>
            </div>
          </div>

          {/* ── Job title ───────────────────────────────────── */}
          <h1
            className="animate-fade-up stagger-2 mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              letterSpacing: '-0.015em',
            }}
          >
            {job.title}
          </h1>

          {/* ── Description block ───────────────────────────── */}
          <div
            className="animate-fade-up stagger-3 mb-8 rounded-xl"
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              padding: '1.4rem 1.5rem',
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              Description
            </p>
            <p
              className="whitespace-pre-wrap text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {job.description}
            </p>
          </div>

          {/* ── Details grid ────────────────────────────────── */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6"
            style={{ borderTop: '1px solid var(--border-light)' }}
          >
            {/* Location */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                Location
              </p>
              <div className="flex items-center gap-2">
                <svg width="13" height="16" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, color: 'var(--text-muted)' }}>
                  <path d="M6 0C3.79 0 2 1.79 2 4c0 3 4 8.5 4 8.5S10 7 10 4c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 6 2.5a1.5 1.5 0 0 1 0 3z" fill="currentColor"/>
                </svg>
                <p
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {job.location || 'Not provided'}
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                Contact Details
              </p>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {job.contactName || 'No name provided'}
              </p>
              {job.contactEmail ? (
                <a
                  href={`mailto:${job.contactEmail}`}
                  className="link-accent"
                  style={{ fontSize: '0.875rem' }}
                >
                  {job.contactEmail}
                </a>
              ) : (
                <p
                  className="text-sm italic"
                  style={{ color: 'var(--text-muted)' }}
                >
                  No email provided
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}