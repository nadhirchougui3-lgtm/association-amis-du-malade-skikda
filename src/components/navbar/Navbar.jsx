
import { Link } from 'react-router-dom'
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaPhone,
  FaUser,
  FaTools,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa'
import MobileBottomNav from './MobileBottomNav'
import './Navbar.css'

export default function Navbar({ user = null, role = 'guest' }) {
  const currentRole =
    role === 'admin' || user?.role === 'admin'
      ? 'admin'
      : user || role === 'user'
        ? 'user'
        : 'guest'

  const links = [
    { label: 'Home', to: '/', icon: FaHome },
    { label: 'About', to: '/#about', icon: FaUsers },
    { label: 'Activities', to: '/activities', icon: FaCalendarAlt },
    { label: 'Map', to: '/map', icon: FaMapMarkedAlt },
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
            {links.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="association-desktop-link"
                >
                  <Icon aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="association-desktop-actions">
            {currentRole === 'guest' && (
              <>
                <Link className="association-signin" to="/signin">
                  <FaSignInAlt aria-hidden="true" />
                  <span>Sign In</span>
                </Link>

                <Link className="association-signup" to="/signup">
                  <FaUserPlus aria-hidden="true" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}

            {currentRole === 'user' && (
              <>
                <Link className="association-signin" to="/contact">
                  <FaPhone aria-hidden="true" />
                  <span>Contact</span>
                </Link>

                <Link className="association-signup" to="/account">
                  <FaUser aria-hidden="true" />
                  <span>Account</span>
                </Link>
              </>
            )}

            {currentRole === 'admin' && (
              <>
                <Link className="association-signin" to="/admin">
                  <FaTools aria-hidden="true" />
                  <span>Admin</span>
                </Link>

                <Link className="association-signup" to="/account">
                  <FaUser aria-hidden="true" />
                  <span>Account</span>
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
