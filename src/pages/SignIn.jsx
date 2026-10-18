
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FaPhoneAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from 'react-icons/fa'
import './AuthPages.css'

const API_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000'
).replace(/\/+$/, '')

export default function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    telephone: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (loading) return

    const telephone = formData.telephone.trim()

    if (!telephone) {
      setError('Please enter your phone number.')
      return
    }

    if (!formData.password) {
      setError('Please enter your password.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telephone,
          password: formData.password,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed. Please try again.')
      }

      if (!data.token || !data.user) {
        throw new Error('The server returned an invalid sign-in response.')
      }

      localStorage.setItem('association_token', data.token)
      localStorage.setItem('association_user', JSON.stringify(data.user))

      navigate('/account', { replace: true })
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Unable to connect to the server. Please try again.'
          : err.message || 'Something went wrong. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-heading">
          <span className="auth-eyebrow">
            FRIENDS OF THE PATIENT ASSOCIATION
          </span>

          <h1>Welcome back</h1>

          <p>
            Sign in to access your account and stay connected
            with our community.
          </p>
        </div>

        {location.state?.message && (
          <p className="auth-message" role="status">
            {location.state.message}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="signin-phone">Phone number</label>

            <div className="auth-input-wrap">
              <FaPhoneAlt aria-hidden="true" />

              <input
                id="signin-phone"
                type="tel"
                name="telephone"
                placeholder="Enter your phone number"
                value={formData.telephone}
                onChange={handleChange}
                autoComplete="tel"
                maxLength={20}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="signin-password">Password</label>

            <div className="auth-input-wrap">
              <FaLock aria-hidden="true" />

              <input
                id="signin-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                maxLength={128}
                required
                disabled={loading}
              />

              <button
                className="auth-password-toggle"
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && (
            <p className="auth-message" role="alert">
              {error}
            </p>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            {!loading && <FaArrowRight aria-hidden="true" />}
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account?{' '}
          <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </section>
  )
}
