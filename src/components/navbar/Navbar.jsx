
import { NavLink } from 'react-router-dom'
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaPhone,
  FaUser,
} from 'react-icons/fa'
import { useLanguage } from '../../context/LanguageContext'
import MobileBottomNav from './MobileBottomNav'
import './Navbar.css'

export default function Navbar() {
  const { t } = useLanguage()

  const links = [
    { label: t('home'), to: '/', icon: FaHome, end: true },
    { label: t('about'), to: '/about', icon: FaUsers },
    { label: t('activities'), to: '/activities', icon: FaCalendarAlt },
    { label: t('map'), to: '/map', icon: FaMapMarkedAlt },
    { label: t('contact'), to: '/contact', icon: FaPhone },
    { label: t('account'), to: '/account', icon: FaUser },
  ]

  return (
    <>
      <header className="association-navbar" dir="ltr">
        <div className="association-navbar-inner">
          <NavLink
            to="/"
            className="association-brand"
            aria-label={t('associationName')}
          >
            <span className="association-brand-mark">
              <img
                src="/association-logo.png"
                alt={t('associationName')}
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                }}
              />
              <span className="association-brand-fallback" aria-hidden="true">
                +
              </span>
            </span>

            <span className="association-brand-copy">
              <strong>{t('associationName')}</strong>
              <small>{t('associationLocation')}</small>
            </span>
          </NavLink>

          <nav
            className="association-desktop-links"
            aria-label="Main navigation"
            dir="ltr"
          >
            {links.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `association-desktop-link${isActive ? ' active' : ''}`
                  }
                >
                  <Icon aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>
      </header>

      <MobileBottomNav />
    </>
  )
}
