
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaNewspaper,
  FaPhone,
  FaUser,
  FaTools,
} from 'react-icons/fa'
import './MobileBottomNav.css'

function readUserRole() {
  try {
    const rawUser = localStorage.getItem('association_user')

    if (!rawUser) return 'guest'

    const user = JSON.parse(rawUser)

    if (user?.role === 'admin') return 'admin'
    if (user) return 'user'

    return 'guest'
  } catch {
    return 'guest'
  }
}

export default function MobileBottomNav({ role = 'guest' }) {
  const location = useLocation()
  const [currentRole, setCurrentRole] = useState(readUserRole)

  useEffect(() => {
    setCurrentRole(readUserRole())
  }, [location.pathname, location.key, role])

  useEffect(() => {
    const refreshRole = () => setCurrentRole(readUserRole())

    window.addEventListener('storage', refreshRole)
    window.addEventListener('association-auth-change', refreshRole)

    return () => {
      window.removeEventListener('storage', refreshRole)
      window.removeEventListener('association-auth-change', refreshRole)
    }
  }, [])

  const accountLinks =
    currentRole === 'admin'
      ? [
          { label: 'Admin', to: '/admin', icon: FaTools },
          { label: 'Account', to: '/account', icon: FaUser },
        ]
      : currentRole === 'user'
        ? [
            { label: 'Contact', to: '/contact', icon: FaPhone },
            { label: 'Account', to: '/account', icon: FaUser },
          ]
        : [
            { label: 'Sign In', to: '/signin', icon: FaUser },
            { label: 'Sign Up', to: '/signup', icon: FaUser },
          ]

  const links = [
    { label: 'Home', to: '/', icon: FaHome, end: true },
    { label: 'Activities', to: '/activities', icon: FaCalendarAlt },
    { label: 'Association', to: '/#about', icon: FaUsers },
    { label: 'News', to: '/news', icon: FaNewspaper },
    ...accountLinks,
  ]

  return (
    <nav className="association-mobile-nav" aria-label="Mobile navigation">
      {links.map((item) => {
        const Icon = item.icon

        return (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            aria-label={item.label}
            title={item.label}
            className={({ isActive }) => {
              let active = isActive

              if (item.label === 'Home') {
                active =
                  location.pathname === '/' &&
                  location.hash !== '#about'
              }

              if (item.label === 'Association') {
                active =
                  location.pathname === '/' &&
                  location.hash === '#about'
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
