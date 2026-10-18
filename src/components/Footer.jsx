
import './Footer.css'

const footerGroups = [
  {
    title: 'Association',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Our Activities', href: '/activities' },
      { label: 'Latest News', href: '/news' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { label: 'Join the Association', href: '/signup' },
      { label: 'Member Account', href: '/account' },
      { label: 'Sign In', href: '/signin' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Our Mission', href: '/#about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

function SocialIcon({ name }) {
  if (name === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.5 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.8-.1-1.7-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V21h3.4Z"
        />
      </svg>
    )
  }

  if (name === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="3.2"
          y="3.2"
          width="17.6"
          height="17.6"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.7" cy="6.7" r="1.2" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.5 8.1a6.2 6.2 0 0 1-4-1.5v7.1a6.2 6.2 0 1 1-5.4-6.1v3.4a2.8 2.8 0 1 0 2 2.7V2.5h3.4c.2 2 1.8 3.6 4 3.8v1.8Z"
      />
    </svg>
  )
}

const socialLinks = [
  { name: 'Facebook', href: '' },
  { name: 'Instagram', href: '' },
  { name: 'TikTok', href: '' },
]

export default function Footer() {
  return (
    <footer className="association-footer">
      <div className="association-footer-main">
        <div className="association-footer-brand">
          <a
            className="association-footer-logo"
            href="/"
            aria-label="Friends of the Patient Association home"
          >
            <img
              src="/association-logo.png"
              alt="Friends of the Patient Association"
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />

            <span className="association-footer-logo-text">
              <span className="association-footer-name">
                Friends of the <span>Patient</span>
              </span>
              <span className="association-footer-tagline">
                SKIKDA · ALGERIA
              </span>
            </span>
          </a>

          <p className="association-footer-description">
            Supporting patients and promoting solidarity through
            community activities, awareness, and humanitarian action.
          </p>

          <a className="association-footer-contact-link" href="/contact">
            Contact the Association
            <span aria-hidden="true"> ↗</span>
          </a>

          <div
            className="association-footer-socials"
            aria-label="Social media"
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                className="association-footer-social"
                href={social.href || undefined}
                aria-label={social.name}
                title={social.name}
                aria-disabled={!social.href}
                onClick={(event) => {
                  if (!social.href) event.preventDefault()
                }}
              >
                <SocialIcon name={social.name} />
              </a>
            ))}
          </div>
        </div>

        {footerGroups.map((group) => (
          <nav
            className="association-footer-column"
            key={group.title}
            aria-label={group.title}
          >
            <h3>{group.title}</h3>

            {group.links.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>
        ))}

        <div className="association-footer-location">
          <h3>Our Community</h3>
          <div className="association-footer-location-mark" aria-hidden="true">
            <span>+</span>
          </div>
          <p>Friends of the Patient Association</p>
          <span>Skikda, Algeria</span>
          <a href="/contact">Get in touch ↗</a>
        </div>
      </div>

      <div className="association-footer-bottom">
        <p>
          © {new Date().getFullYear()} Friends of the Patient Association.
          All rights reserved.
        </p>

        <span className="association-footer-country">
          <span aria-hidden="true">●</span> SKIKDA, ALGERIA
        </span>
      </div>
    </footer>
  )
}
