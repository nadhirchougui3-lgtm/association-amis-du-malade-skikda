
import { Link } from 'react-router-dom'
import {
  FaMapMarkerAlt,
  FaDirections,
  FaEnvelope,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import './MapPage.css'

const GOOGLE_MAPS_URL =
  'https://maps.app.goo.gl/7QZ6v6i2vqHZc1EX7'

const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=RWXH%2B8R5%20Hamadi%20Krouma%2C%20Skikda%2C%20Algeria&output=embed'

const translations = {
  en: {
    findUs: 'FIND US',
    title: 'Come visit us.',
    intro:
      'We welcome you to the Friends of the Patient Association in Hamadi Krouma, Skikda.',
    city: 'Skikda, Algeria',
    ourLocation: 'OUR LOCATION',
    openMap: 'Open location in Google Maps',
    directions: 'Open directions in Google Maps',
    sectionLabel: 'Association location',
    addressContact: 'ADDRESS & CONTACT',
    associationName: 'Friends of the Patient Association',
    detailsIntro: 'Find our location and plan your visit.',
    address: 'ADDRESS',
    fullAddress: 'Hamadi Krouma, Skikda, Algeria',
    needContact: 'Need to get in touch?',
    contactIntro:
      'Contact the association if you need further information before your visit.',
    contactUs: 'Contact us',
    footerLocation: 'SKIKDA · ALGERIA',
    mapTitle: 'Friends of the Patient Association on Google Maps',
  },
  fr: {
    findUs: 'NOUS TROUVER',
    title: 'Venez nous rendre visite.',
    intro:
      'Nous vous accueillons au sein de l’Association des Amis du Malade à Hamadi Krouma, Skikda.',
    city: 'Skikda, Algérie',
    ourLocation: 'NOTRE EMPLACEMENT',
    openMap: 'Ouvrir la localisation sur Google Maps',
    directions: 'Itinéraire sur Google Maps',
    sectionLabel: 'Localisation de l’association',
    addressContact: 'ADRESSE ET CONTACT',
    associationName: 'Association des Amis du Malade',
    detailsIntro: 'Retrouvez notre adresse et préparez votre visite.',
    address: 'ADRESSE',
    fullAddress: 'Hamadi Krouma, Skikda, Algérie',
    needContact: 'Besoin de nous contacter ?',
    contactIntro:
      'Contactez l’association pour obtenir plus d’informations avant votre visite.',
    contactUs: 'Nous contacter',
    footerLocation: 'SKIKDA · ALGÉRIE',
    mapTitle: 'Association des Amis du Malade sur Google Maps',
  },
  ar: {
    findUs: 'تجدنا هنا',
    title: 'يسعدنا استقبالكم.',
    intro:
      'نرحب بكم في جمعية أصدقاء المريض بحمادي كرومة، سكيكدة.',
    city: 'سكيكدة، الجزائر',
    ourLocation: 'موقعنا',
    openMap: 'افتح الموقع على خرائط Google',
    directions: 'عرض الطريق على خرائط Google',
    sectionLabel: 'موقع الجمعية',
    addressContact: 'العنوان والتواصل',
    associationName: 'جمعية أصدقاء المريض',
    detailsIntro: 'اكتشف موقعنا وخطّط لزيارتك.',
    address: 'العنوان',
    fullAddress: 'حمادي كرومة، سكيكدة، الجزائر',
    needContact: 'تحتاج إلى التواصل معنا؟',
    contactIntro:
      'تواصل مع الجمعية إذا كنت بحاجة إلى معلومات إضافية قبل زيارتك.',
    contactUs: 'اتصل بنا',
    footerLocation: 'سكيكدة · الجزائر',
    mapTitle: 'جمعية أصدقاء المريض على خرائط Google',
  },
}

export default function MapPage() {
  const { language } = useLanguage()
  const text = translations[language] || translations.en

  return (
    <main className="location-page" dir="ltr">
      <div className="location-page__container">
        <header className="location-header">
          <div className="location-header__label">
            <span className="location-header__line" />
            {text.findUs}
          </div>

          <div className="location-header__content">
            <div>
              <h1>{text.title}</h1>
              <p>{text.intro}</p>
            </div>

            <div className="location-header__city">
              <FaMapMarkerAlt aria-hidden="true" />
              <span>{text.city}</span>
            </div>
          </div>
        </header>

        <section
          className="location-content"
          aria-label={text.sectionLabel}
        >
          <div className="location-map">
            <div className="location-map__topbar">
              <span className="location-map__status">
                <span />
                {text.ourLocation}
              </span>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="location-map__external-link"
                aria-label={text.openMap}
              >
                <FaExternalLinkAlt aria-hidden="true" />
              </a>
            </div>

            <div className="location-map__frame">
              <iframe
                title={text.mapTitle}
                src={MAP_EMBED_URL}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              className="location-map__directions"
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDirections aria-hidden="true" />
              <span>{text.directions}</span>
              <FaExternalLinkAlt
                className="location-map__directions-icon"
                aria-hidden="true"
              />
            </a>
          </div>

          <aside className="location-details">
            <div className="location-details__heading">
              <span className="location-details__eyebrow">
                {text.addressContact}
              </span>

              <h2>{text.associationName}</h2>
              <p>{text.detailsIntro}</p>
            </div>

            <div className="location-details__divider" />

            <div className="location-details__item">
              <span className="location-details__icon">
                <FaMapMarkerAlt aria-hidden="true" />
              </span>

              <div>
                <span className="location-details__label">
                  {text.address}
                </span>
                <p>{text.fullAddress}</p>
              </div>
            </div>

            <div className="location-details__divider" />

            <div className="location-details__help">
              <h3>{text.needContact}</h3>
              <p>{text.contactIntro}</p>

              <Link
                to="/contact"
                className="location-details__contact"
              >
                <FaEnvelope aria-hidden="true" />
                {text.contactUs}
              </Link>
            </div>

            <div className="location-details__footer">
              <span className="location-details__footer-mark" />
              <span>{text.associationName}</span>
            </div>
          </aside>
        </section>

        <footer className="location-page__footer">
          <span>{text.associationName.toUpperCase()}</span>
          <span>{text.footerLocation}</span>
        </footer>
      </div>
    </main>
  )
}
