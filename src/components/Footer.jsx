import './Footer.css'
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const translations = {
  en: {
    association: 'Association',
    home: 'Home',
    activities: 'Our Activities',
    news: 'Latest News',
    getInvolved: 'Get Involved',
    join: 'Join the Association',
    account: 'Member Account',
    signIn: 'Sign In',
    discover: 'Discover',
    mission: 'Our Mission',
    contact: 'Contact Us',
    description:
      'Supporting patients and promoting solidarity through community activities, awareness, and humanitarian action.',
    contactAssociation: 'Contact the Association',
    contactInformation: 'Contact Information',
    viewMap: 'View on Google Maps',
    address: 'Skikda, Algeria',
    getInTouch: 'Get in touch',
    copyright:
      'Friends of the Patient Association. All rights reserved.',
    country: 'SKIKDA · ALGERIA',
    brand: 'Friends of the Patient Association',
    homeAria: 'Friends of the Patient Association home',
    socialMedia: 'Social media',
  },
  fr: {
    association: 'Association',
    home: 'Accueil',
    activities: 'Nos activités',
    news: 'Dernières actualités',
    getInvolved: 'Participer',
    join: "Rejoindre l’association",
    account: 'Espace membre',
    signIn: 'Se connecter',
    discover: 'Découvrir',
    mission: 'Notre mission',
    contact: 'Nous contacter',
    description:
      'Soutenir les patients et promouvoir la solidarité grâce aux activités communautaires, à la sensibilisation et aux actions humanitaires.',
    contactAssociation: "Contacter l’association",
    contactInformation: 'Coordonnées',
    viewMap: 'Voir sur Google Maps',
    address: 'Skikda, Algérie',
    getInTouch: 'Prendre contact',
    copyright:
      'Association des Amis du Malade. Tous droits réservés.',
    country: 'SKIKDA · ALGÉRIE',
    brand: 'Association des Amis du Malade',
    homeAria: 'Accueil de l’Association des Amis du Malade',
    socialMedia: 'Réseaux sociaux',
  },
  ar: {
    association: 'الجمعية',
    home: 'الرئيسية',
    activities: 'نشاطاتنا',
    news: 'آخر الأخبار',
    getInvolved: 'ساهم معنا',
    join: 'الانخراط في الجمعية',
    account: 'حساب العضو',
    signIn: 'تسجيل الدخول',
    discover: 'اكتشف',
    mission: 'أهدافنا',
    contact: 'اتصل بنا',
    description:
      'دعم المرضى وتعزيز التضامن من خلال النشاطات المجتمعية والتوعية والعمل الإنساني.',
    contactAssociation: 'اتصل بالجمعية',
    contactInformation: 'معلومات الاتصال',
    viewMap: 'عرض الموقع على خرائط Google',
    address: 'سكيكدة، الجزائر',
    getInTouch: 'تواصل معنا',
    copyright: 'جمعية أصدقاء المريض. جميع الحقوق محفوظة.',
    country: 'سكيكدة · الجزائر',
    brand: 'جمعية أصدقاء المريض',
    homeAria: 'الصفحة الرئيسية لجمعية أصدقاء المريض',
    socialMedia: 'وسائل التواصل الاجتماعي',
  },
}

const footerGroups = [
  {
    titleKey: 'association',
    links: [
      { labelKey: 'home', href: '/' },
      { labelKey: 'activities', href: '/activities' },
      { labelKey: 'news', href: '/news' },
    ],
  },
  {
    titleKey: 'getInvolved',
    links: [
      { labelKey: 'join', href: '/signup' },
      { labelKey: 'account', href: '/account' },
      { labelKey: 'signIn', href: '/signin' },
    ],
  },
  {
    titleKey: 'discover',
    links: [
      { labelKey: 'mission', href: '/#about' },
      { labelKey: 'contact', href: '/contact' },
    ],
  },
]

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1A2fqDXAMy/',
    Icon: FaFacebookF,
  },
  {
    name: 'Instagram',
    href: '',
    Icon: FaInstagram,
  },
  {
    name: 'TikTok',
    href: '',
    Icon: FaTiktok,
  },
]

export default function Footer() {
  const { language } = useLanguage()
  const text = translations[language] || translations.en

  const contactDetails = [
    {
      label: '0780 42 21 94',
      href: 'tel:0780422194',
      Icon: FaPhone,
    },
    {
      label: 'lam_skikda@yahoo.fr',
      href: 'mailto:lam_skikda@yahoo.fr',
      Icon: FaEnvelope,
    },
    {
      label: text.viewMap,
      href: 'https://maps.app.goo.gl/7QZ6v6i2vqHZc1EX7',
      Icon: FaMapMarkerAlt,
      external: true,
    },
  ]

  return (
    <footer className="association-footer" dir="ltr">
      <div className="association-footer-main">
        <div className="association-footer-brand">
          <a
            className="association-footer-logo"
            href="/"
            aria-label={text.homeAria}
          >
            <img
              src="/association-logo.png"
              alt={text.homeAria}
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />

            <span className="association-footer-logo-text">
              <span className="association-footer-name">
                {text.brand}
              </span>

              <span className="association-footer-tagline">
                {text.country}
              </span>
            </span>
          </a>

          <p className="association-footer-description">
            {text.description}
          </p>

          <a
            className="association-footer-contact-link"
            href="/contact"
          >
            {text.contactAssociation}
            <span aria-hidden="true">↗</span>
          </a>

          <div
            className="association-footer-socials"
            aria-label={text.socialMedia}
          >
            {socialLinks.map(({ name, href, Icon }) => (
              <a
                key={name}
                className="association-footer-social"
                href={href || undefined}
                aria-label={name}
                title={name}
                aria-disabled={!href}
                onClick={(event) => {
                  if (!href) event.preventDefault()
                }}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {footerGroups.map((group) => (
          <nav
            className="association-footer-column"
            key={group.titleKey}
            aria-label={text[group.titleKey]}
            dir="ltr"
          >
            <h3>{text[group.titleKey]}</h3>

            {group.links.map((link) => (
              <a href={link.href} key={link.labelKey}>
                {text[link.labelKey]}
              </a>
            ))}
          </nav>
        ))}

        <div className="association-footer-location" dir="ltr">
          <h3>{text.contactInformation}</h3>

          {contactDetails.map(
            ({ label, href, Icon, external = false }) => (
              <a
                key={label}
                className="association-footer-contact-item"
                href={href}
                {...(external
                  ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    }
                  : {})}
              >
                <span className="association-footer-contact-icon">
                  <Icon aria-hidden="true" />
                </span>

                <span className="association-footer-contact-label">
                  {label}
                </span>
              </a>
            ),
          )}

          <p className="association-footer-address">
            {text.address}
          </p>

          <a
            className="association-footer-location-link"
            href="/contact"
          >
            {text.getInTouch}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="association-footer-bottom" dir="ltr">
        <p>
          © {new Date().getFullYear()} {text.copyright}
        </p>

        <span className="association-footer-country">
          {text.country}
        </span>
      </div>
    </footer>
  )
}