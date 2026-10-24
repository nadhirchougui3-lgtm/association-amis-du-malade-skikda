import { NavLink, useLocation } from 'react-router-dom'
import {
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaPhone,
  FaUser,
  FaMapMarkedAlt,
} from 'react-icons/fa'
import { useLanguage } from '../../context/LanguageContext'
import './MobileBottomNav.css'

export default function MobileBottomNav() {
  const location = useLocation()
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
    <nav className="association-mobile-nav" aria-label="Mobile navigation">
      {links.map((item) => {
        const Icon = item.icon

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            aria-label={item.label}
            title={item.label}
            className={({ isActive }) => {
              let active = isActive

              if (item.to === '/') {
                active =
                  location.pathname === '/' &&
                  location.hash !== '#about'
              }

              if (item.to === '/about') {
                active =
                  location.pathname === '/about' ||
                  (location.pathname === '/' &&
                    location.hash === '#about')
              }

              return `association-mobile-nav-link${active ? ' active' : ''}`
            }}
          >
            <Icon className="association-mobile-icon" aria-hidden="true" />
            <span className="association-mobile-nav-label">
              {item.label}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}