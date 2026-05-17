'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/services/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser(formData);
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
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
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
          >
            GlobalTNA
          </p>
          <Link href="/login" className="link-back">
            Sign in instead
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </header>

      {/* ── Centred card ────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div
          className="card animate-fade-up stagger-1 w-full"
          style={{ maxWidth: '440px', padding: '2.5rem 2.25rem' }}
        >
          {/* Heading */}
          <div className="mb-8" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem' }}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              Get started
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
              Create your account
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
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}
          >
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="input-base"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-base"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-base"
              />
            </div>

            {/* Submit */}
            <div style={{ paddingTop: '0.4rem' }}>
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
                    Creating account…
                  </>
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </form>

          {/* Login link */}
          <p
            className="text-center text-sm mt-6"
            style={{ color: 'var(--text-muted)' }}
          >
            Already have an account?{' '}
            <Link
              href="/login"
              className="link-accent"
              style={{ fontSize: '0.875rem' }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}