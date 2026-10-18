
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaUser,
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

export default function SignUp() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
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

    const nom = formData.nom.trim()
    const telephone = formData.telephone.trim()

    if (nom.length < 2 || nom.length > 100) {
      setError('Full name must contain between 2 and 100 characters.')
      return
    }

    if (!telephone) {
      setError('Please enter your phone number.')
      return
    }

    if (
      formData.password.length < 6 ||
      formData.password.length > 128
    ) {
      setError('Password must contain between 6 and 128 characters.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom,
          telephone,
          password: formData.password,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          data.message || 'Registration failed. Please try again.',
        )
      }

      navigate('/signin', {
        replace: true,
        state: {
          message:
            data.message ||
            'Account created successfully. You can now sign in.',
        },
      })
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
      <div className="auth-card auth-card-signup">
        <div className="auth-heading">
          <span className="auth-eyebrow">
            FRIENDS OF THE PATIENT ASSOCIATION
          </span>

          <h1>Create your account</h1>

          <p>
            Join our community and help us make a difference
            through care and solidarity.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="signup-name">Full name</label>

            <div className="auth-input-wrap">
              <FaUser aria-hidden="true" />

              <input
                id="signup-name"
                type="text"
                name="nom"
                placeholder="Enter your full name"
                value={formData.nom}
                onChange={handleChange}
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="signup-phone">Phone number</label>

            <div className="auth-input-wrap">
              <FaPhoneAlt aria-hidden="true" />

              <input
                id="signup-phone"
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
            <label htmlFor="signup-password">Password</label>

            <div className="auth-input-wrap">
              <FaLock aria-hidden="true" />

              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={6}
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

          <div className="auth-field">
            <label htmlFor="signup-confirm-password">
              Confirm password
            </label>

            <div className="auth-input-wrap">
              <FaLock aria-hidden="true" />

              <input
                id="signup-confirm-password"
                type={showConfirmation ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                maxLength={128}
                required
                disabled={loading}
              />

              <button
                className="auth-password-toggle"
                type="button"
                onClick={() =>
                  setShowConfirmation((previous) => !previous)
                }
                aria-label={
                  showConfirmation
                    ? 'Hide confirmation password'
                    : 'Show confirmation password'
                }
                disabled={loading}
              >
                {showConfirmation ? <FaEyeSlash /> : <FaEye />}
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
            <span>{loading ? 'Creating account...' : 'Create Account'}</span>
            {!loading && <FaArrowRight aria-hidden="true" />}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </section>
  )
}
