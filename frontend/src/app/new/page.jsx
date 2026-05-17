// src/app/new/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createJob } from '../../services/api';

export default function NewJobRequest() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Plumbing',
    location: '',
    contactName: '',
    contactEmail: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createJob(formData);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong while creating the request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--bg-canvas)' }}
    >
      {/* ── Slim top bar ─────────────────────────────────────── */}
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

      {/* ── Form container ───────────────────────────────────── */}
      <div className="flex-1 flex justify-center px-4 sm:px-6 py-10">
        <div
          className="card animate-fade-up stagger-1 w-full"
          style={{ maxWidth: '680px', padding: '2.5rem 2.25rem' }}
        >

          {/* Page heading */}
          <div className="mb-8" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem' }}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              New Request
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 1.9rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              Post a Service Request
            </h1>
          </div>

          {/* Error banner */}
          {error && (
            <div
              className="animate-fade-up mb-6 flex items-start gap-3 rounded-lg p-4 text-sm"
              style={{
                background: '#FEF2F2',
                border: '1px solid #FAD7D4',
                color: '#C0392B',
              }}
            >
              <span style={{ flexShrink: 0, marginTop: '1px' }}>⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Title <span style={{ color: '#C0392B' }}>*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Need a plumber for a leaking kitchen tap"
                className="input-base"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Description <span style={{ color: '#C0392B' }}>*</span>
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide more details about the issue, urgency, and any relevant context…"
                className="input-base"
                style={{ resize: 'vertical', lineHeight: 1.65 }}
              />
            </div>

            {/* Category + Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-base"
                >
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
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Glasgow"
                  className="input-base"
                />
              </div>
            </div>

            {/* Contact fields */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{
                  color: 'var(--text-muted)',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '0.6rem',
                }}
              >
                Contact Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="input-base"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="input-base"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div style={{ paddingTop: '0.5rem' }}>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid rgba(255,255,255,0.35)',
                        borderTopColor: '#fff',
                        borderRadius: '50%',
                        animation: 'spin 0.7s linear infinite',
                        display: 'inline-block',
                        flexShrink: 0,
                      }}
                    />
                    Submitting…
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}