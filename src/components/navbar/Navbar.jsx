
import { Link } from 'react-router-dom'
import MobileBottomNav from './MobileBottomNav'
import './Navbar.css'

export default function Navbar({ user = null, role = 'guest' }) {
  const currentRole =
    role === 'admin' || user?.role === 'admin'
      ? 'admin'
      : user
        ? 'user'
        : 'guest'

  const links = [
    { label: 'Home', to: '/#home' },
    { label: 'Activities', to: '/activities' },
    { label: 'Association', to: '/#about' },
    { label: 'News', to: '/news' },
  ]

  return (
    <>
      <header className="association-navbar">
        <div className="association-navbar-inner">
          <Link
            to="/"
            className="association-brand"
            aria-label="Friends of the Patient Association home"
          >
            <span className="association-brand-mark">
              <img
                src="/association-logo.png"
                alt="Association logo"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                }}
              />
              <span className="association-brand-fallback" aria-hidden="true">
                +
              </span>
            </span>

            <span className="association-brand-copy">
              <strong>Friends of the Patient</strong>
              <small>SKIKDA · ALGERIA</small>
            </span>
          </Link>

          <nav
            className="association-desktop-links"
            aria-label="Main navigation"
          >
            {links.map((item) => (
              <Link key={item.label} to={item.to}>
                {item.label}
              </Link>
            ))}

            <Link to="/contact">Contact</Link>
          </nav>

          <div className="association-desktop-actions">
            {currentRole === 'guest' && (
              <>
                <Link className="association-signin" to="/signin">
                  Sign In
                </Link>
                <Link className="association-signup" to="/signup">
                  Sign Up
                </Link>
              </>
            )}

            {currentRole === 'user' && (
              <>
                <Link className="association-signin" to="/contact">
                  Contact
                </Link>
                <Link className="association-signup" to="/account">
                  My Account
                </Link>
              </>
            )}

            {currentRole === 'admin' && (
              <>
                <Link className="association-signin" to="/admin">
                  Admin
                </Link>
                <Link className="association-signup" to="/account">
                  My Account
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <MobileBottomNav role={currentRole} />
    </>
  )
}
