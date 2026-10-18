
import { useState } from 'react'
import './AccountPage.css'

function getStoredUser() {
  try {
    const savedUser = localStorage.getItem('association_user')
    return savedUser ? JSON.parse(savedUser) : null
  } catch {
    return null
  }
}

function getInitials(user) {
  const name = user?.nom || user?.name || user?.fullName || ''
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || 'U'
}

function AccountPage() {
  const [user] = useState(getStoredUser)

  const name = user?.nom || user?.name || user?.fullName || 'Member'
  const email = user?.email || 'Not provided'
  const phone = user?.telephone || user?.phone || 'Not provided'
  const role = user?.role || 'Member'

  return (
    <div className="account-page">
      <header className="account-header">
        <div className="account-header-content">
          <span className="account-eyebrow">PERSONAL SPACE</span>
          <h1>My Account</h1>
          <p>
            Manage your personal information and keep track of your
            activities with the association.
          </p>
        </div>
      </header>

      <main className="account-container">
        <section className="account-profile">
          <div className="account-avatar">
            {getInitials(user)}
          </div>

          <div className="account-profile-info">
            <h2>{name}</h2>
            <p>{email}</p>
            <span className="account-role">{role}</span>
          </div>
        </section>

        <div className="account-section-heading">
          <span className="account-eyebrow">YOUR SPACE</span>
          <h2>Account overview</h2>
          <p>Find your personal information and account services.</p>
        </div>

        <div className="account-grid">
          <section className="account-card account-personal-card">
            <div className="account-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-2a8 8 0 0 1 16 0v2Z" />
              </svg>
            </div>

            <h3>Personal Information</h3>
            <p className="account-card-description">
              Your account details.
            </p>

            <div className="account-detail">
              <span>Full name</span>
              <strong>{name}</strong>
            </div>

            <div className="account-detail">
              <span>Email address</span>
              <strong>{email}</strong>
            </div>

            <div className="account-detail">
              <span>Phone number</span>
              <strong>{phone}</strong>
            </div>

            <p className="account-pending">
              Profile editing will be available once connected to the
              association server.
            </p>
          </section>

          <section className="account-card">
            <div className="account-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M3 7h18v14H3z" />
                <path d="M3 11h18M7 7V3h10v4" />
              </svg>
            </div>

            <h3>My Activities</h3>
            <p className="account-card-description">
              Keep track of your participation.
            </p>

            <div className="account-empty-state">
              <span className="account-empty-icon" aria-hidden="true">
                ◷
              </span>
              <strong>No activities yet</strong>
              <p>
                Your registered activities will appear here when this
                section is connected.
              </p>
            </div>
          </section>

          <section className="account-card">
            <div className="account-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z" />
              </svg>
            </div>

            <h3>My Contributions</h3>
            <p className="account-card-description">
              Your contributions to our community.
            </p>

            <div className="account-empty-state">
              <span className="account-empty-icon" aria-hidden="true">
                +
              </span>
              <strong>Your impact starts here</strong>
              <p>
                Contribution history and related information will be
                available in a future update.
              </p>
            </div>
          </section>

          <section className="account-card">
            <div className="account-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4l3 2" />
              </svg>
            </div>

            <h3>Account Settings</h3>
            <p className="account-card-description">
              Preferences and account security.
            </p>

            <div className="account-detail">
              <span>Account type</span>
              <strong>{role}</strong>
            </div>

            <div className="account-detail">
              <span>Language</span>
              <strong>English</strong>
            </div>

            <p className="account-pending">
              Language preferences and security settings are not
              configurable here yet.
            </p>
          </section>
        </div>

        <section className="account-help">
          <div>
            <h2>Need assistance?</h2>
            <p>
              Contact the association if you need help with your account.
            </p>
          </div>

          <a href="/contact" className="account-contact-link">
            Contact Us
            <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
    </div>
  )
}

export default AccountPage
