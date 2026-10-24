
import { useState } from 'react'
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaPaperPlane,
  FaHeart,
  FaHandHoldingHeart,
  FaArrowRight,
} from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import './ContactPage.css'

const translations = {
  en: {
    association: 'FRIENDS OF THE PATIENT ASSOCIATION',
    heroTitle: 'We are here',
    heroAccent: 'for you.',
    heroDescription: 'Have a question, need information, or want to support our mission? We would be glad to hear from you.',
    heroNote: 'Care, solidarity and support for everyone.',
    getInTouch: 'GET IN TOUCH',
    sidebarTitle: "Let's make a",
    sidebarAccent: 'difference.',
    sidebarDescription: 'Whether you are a patient, a family member, a volunteer or a partner, your message matters to us.',
    phone: 'Phone',
    phoneSoon: 'Contact details coming soon',
    email: 'Email',
    emailSoon: 'Email address coming soon',
    location: 'Location',
    city: 'Skikda, Algeria',
    stayConnected: 'Stay connected',
    socialSoon: 'Our official social media links will be added here.',
    whatsappSoon: 'WhatsApp link coming soon',
    facebookSoon: 'Facebook link coming soon',
    instagramSoon: 'Instagram link coming soon',
    sendMessage: 'SEND A MESSAGE',
    formTitle: 'How can we help?',
    formDescription: "Fill in the details below. We will connect this form to the association's messaging system in a later step.",
    fullName: 'Full name',
    namePlaceholder: 'Enter your full name',
    emailAddress: 'Email address',
    emailPlaceholder: 'you@example.com',
    subject: 'Subject',
    chooseSubject: 'Choose a subject',
    general: 'General inquiry',
    patientSupport: 'Patient support',
    volunteering: 'Volunteering',
    activities: 'Activities and training',
    partnership: 'Partnership',
    other: 'Other',
    message: 'Your message',
    messagePlaceholder: 'How can the association help you?',
    notice: "Your message has not been sent yet. The contact form needs to be connected to the association server.",
    send: 'Send message',
    privacy: 'Please avoid including sensitive medical information in this form.',
    bottomNote: 'Together, we can bring more care, hope and solidarity to patients and their families.',
  },
  fr: {
    association: 'ASSOCIATION DES AMIS DU MALADE',
    heroTitle: 'Nous sommes là',
    heroAccent: 'pour vous.',
    heroDescription: 'Une question, besoin d’informations ou envie de soutenir notre mission ? Nous serons heureux de vous écouter.',
    heroNote: 'Des soins, de la solidarité et du soutien pour tous.',
    getInTouch: 'CONTACTEZ-NOUS',
    sidebarTitle: 'Ensemble, faisons',
    sidebarAccent: 'la différence.',
    sidebarDescription: 'Que vous soyez patient, membre de la famille, bénévole ou partenaire, votre message compte pour nous.',
    phone: 'Téléphone',
    phoneSoon: 'Coordonnées bientôt disponibles',
    email: 'E-mail',
    emailSoon: 'Adresse e-mail bientôt disponible',
    location: 'Localisation',
    city: 'Skikda, Algérie',
    stayConnected: 'Restons en contact',
    socialSoon: 'Les liens officiels de nos réseaux sociaux seront ajoutés ici.',
    whatsappSoon: 'Lien WhatsApp bientôt disponible',
    facebookSoon: 'Lien Facebook bientôt disponible',
    instagramSoon: 'Lien Instagram bientôt disponible',
    sendMessage: 'ENVOYER UN MESSAGE',
    formTitle: 'Comment pouvons-nous vous aider ?',
    formDescription: 'Remplissez les champs ci-dessous. Ce formulaire sera relié au système de messagerie de l’association ultérieurement.',
    fullName: 'Nom complet',
    namePlaceholder: 'Saisissez votre nom complet',
    emailAddress: 'Adresse e-mail',
    emailPlaceholder: 'vous@exemple.com',
    subject: 'Sujet',
    chooseSubject: 'Choisissez un sujet',
    general: 'Demande générale',
    patientSupport: 'Aide aux patients',
    volunteering: 'Bénévolat',
    activities: 'Activités et formation',
    partnership: 'Partenariat',
    other: 'Autre',
    message: 'Votre message',
    messagePlaceholder: 'Comment l’association peut-elle vous aider ?',
    notice: 'Votre message n’a pas encore été envoyé. Le formulaire doit être connecté au serveur de l’association.',
    send: 'Envoyer le message',
    privacy: 'Veuillez éviter d’inclure des informations médicales sensibles dans ce formulaire.',
    bottomNote: 'Ensemble, apportons davantage de soins, d’espoir et de solidarité aux patients et à leurs familles.',
  },
  ar: {
    association: 'جمعية أصدقاء المريض',
    heroTitle: 'نحن هنا',
    heroAccent: 'من أجلك.',
    heroDescription: 'هل لديك سؤال أو تحتاج إلى معلومات أو ترغب في دعم رسالتنا؟ يسعدنا أن نتواصل معك.',
    heroNote: 'رعاية وتضامن ودعم للجميع.',
    getInTouch: 'تواصل معنا',
    sidebarTitle: 'معًا نصنع',
    sidebarAccent: 'الفرق.',
    sidebarDescription: 'سواء كنت مريضًا أو فردًا من العائلة أو متطوعًا أو شريكًا، فإن رسالتك تهمنا.',
    phone: 'الهاتف',
    phoneSoon: 'ستتوفر معلومات الاتصال قريبًا',
    email: 'البريد الإلكتروني',
    emailSoon: 'سيُضاف البريد الإلكتروني قريبًا',
    location: 'الموقع',
    city: 'سكيكدة، الجزائر',
    stayConnected: 'ابقَ على تواصل',
    socialSoon: 'ستُضاف روابط صفحاتنا الرسمية على مواقع التواصل الاجتماعي هنا.',
    whatsappSoon: 'رابط واتساب سيتوفر قريبًا',
    facebookSoon: 'رابط فيسبوك سيتوفر قريبًا',
    instagramSoon: 'رابط إنستغرام سيتوفر قريبًا',
    sendMessage: 'أرسل رسالة',
    formTitle: 'كيف يمكننا مساعدتك؟',
    formDescription: 'املأ المعلومات أدناه. سيتم ربط هذا النموذج بنظام المراسلة الخاص بالجمعية في مرحلة لاحقة.',
    fullName: 'الاسم الكامل',
    namePlaceholder: 'أدخل اسمك الكامل',
    emailAddress: 'البريد الإلكتروني',
    emailPlaceholder: 'you@example.com',
    subject: 'الموضوع',
    chooseSubject: 'اختر موضوعًا',
    general: 'استفسار عام',
    patientSupport: 'مساعدة المرضى',
    volunteering: 'التطوع',
    activities: 'النشاطات والتكوين',
    partnership: 'الشراكة',
    other: 'أخرى',
    message: 'رسالتك',
    messagePlaceholder: 'كيف يمكن للجمعية مساعدتك؟',
    notice: 'لم تُرسل رسالتك بعد. يجب ربط نموذج الاتصال بخادم الجمعية.',
    send: 'إرسال الرسالة',
    privacy: 'يرجى عدم تضمين معلومات طبية حساسة في هذا النموذج.',
    bottomNote: 'معًا نستطيع تقديم المزيد من الرعاية والأمل والتضامن للمرضى وعائلاتهم.',
  },
}

export default function ContactPage() {
  const { language } = useLanguage()
  const text = translations[language] || translations.en

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [notice, setNotice] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (notice) setNotice('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    setNotice(text.notice)
  }

  return (
    <main className="association-contact-page" dir="ltr">
      <section className="association-contact-hero">
        <div className="association-contact-hero-icon">
          <FaHandHoldingHeart aria-hidden="true" />
        </div>

        <span className="association-contact-eyebrow">
          {text.association}
        </span>

        <h1>
          {text.heroTitle} <span>{text.heroAccent}</span>
        </h1>

        <p>{text.heroDescription}</p>

        <div className="association-contact-hero-note">
          <FaHeart aria-hidden="true" />
          <span>{text.heroNote}</span>
        </div>
      </section>

      <section className="association-contact-layout">
        <aside className="association-contact-sidebar">
          <div className="association-contact-sidebar-content">
            <span className="association-contact-kicker">
              {text.getInTouch}
            </span>

            <h2>
              {text.sidebarTitle} <span>{text.sidebarAccent}</span>
            </h2>

            <p className="association-contact-sidebar-description">
              {text.sidebarDescription}
            </p>

            <div className="association-contact-methods">
              <div className="association-contact-method">
                <div className="association-contact-method-icon">
                  <FaPhoneAlt aria-hidden="true" />
                </div>

                <div className="association-contact-method-details">
                  <strong>{text.phone}</strong>
                  <span>{text.phoneSoon}</span>
                </div>

                <FaArrowRight
                  className="association-contact-method-arrow"
                  aria-hidden="true"
                />
              </div>

              <div className="association-contact-method">
                <div className="association-contact-method-icon">
                  <FaEnvelope aria-hidden="true" />
                </div>

                <div className="association-contact-method-details">
                  <strong>{text.email}</strong>
                  <span>{text.emailSoon}</span>
                </div>

                <FaArrowRight
                  className="association-contact-method-arrow"
                  aria-hidden="true"
                />
              </div>

              <div className="association-contact-method">
                <div className="association-contact-method-icon">
                  <FaMapMarkerAlt aria-hidden="true" />
                </div>

                <div className="association-contact-method-details">
                  <strong>{text.location}</strong>
                  <span>{text.city}</span>
                </div>

                <FaArrowRight
                  className="association-contact-method-arrow"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="association-contact-social-section">
              <h3>{text.stayConnected}</h3>
              <p>{text.socialSoon}</p>

              <div className="association-contact-socials">
                <span
                  className="association-contact-social"
                  aria-label={text.whatsappSoon}
                  title={text.whatsappSoon}
                >
                  <FaWhatsapp aria-hidden="true" />
                </span>

                <span
                  className="association-contact-social"
                  aria-label={text.facebookSoon}
                  title={text.facebookSoon}
                >
                  <FaFacebookF aria-hidden="true" />
                </span>

                <span
                  className="association-contact-social"
                  aria-label={text.instagramSoon}
                  title={text.instagramSoon}
                >
                  <FaInstagram aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </aside>

        <section className="association-contact-form-panel">
          <div className="association-contact-form-header">
            <span className="association-contact-kicker">
              {text.sendMessage}
            </span>

            <h2>{text.formTitle}</h2>
            <p>{text.formDescription}</p>
          </div>

          <form
            className="association-contact-form"
            onSubmit={handleSubmit}
          >
            <div className="association-contact-form-row">
              <div className="association-contact-field">
                <label htmlFor="association-contact-name">
                  {text.fullName}
                </label>

                <input
                  id="association-contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={text.namePlaceholder}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="association-contact-field">
                <label htmlFor="association-contact-email">
                  {text.emailAddress}
                </label>

                <input
                  id="association-contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={text.emailPlaceholder}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="association-contact-field">
              <label htmlFor="association-contact-subject">
                {text.subject}
              </label>

              <select
                id="association-contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  {text.chooseSubject}
                </option>
                <option value="General inquiry">{text.general}</option>
                <option value="Patient support">{text.patientSupport}</option>
                <option value="Volunteering">{text.volunteering}</option>
                <option value="Activities and training">{text.activities}</option>
                <option value="Partnership">{text.partnership}</option>
                <option value="Other">{text.other}</option>
              </select>
            </div>

            <div className="association-contact-field">
              <label htmlFor="association-contact-message">
                {text.message}
              </label>

              <textarea
                id="association-contact-message"
                name="message"
                rows={6}
                placeholder={text.messagePlaceholder}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {notice && (
              <p className="association-contact-notice" role="status">
                {notice}
              </p>
            )}

            <button
              className="association-contact-submit"
              type="submit"
            >
              <span>{text.send}</span>
              <FaPaperPlane aria-hidden="true" />
            </button>

            <p className="association-contact-privacy">
              {text.privacy}
            </p>
          </form>
        </section>
      </section>

      <section className="association-contact-bottom-note">
        <FaHeart aria-hidden="true" />
        <p>{text.bottomNote}</p>
      </section>
    </main>
  )
}
