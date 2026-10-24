import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    activities: 'Activities',
    map: 'Map',
    contact: 'Contact',
    account: 'Account',

    associationName: 'Friends of the Patient Association',
    associationLocation: 'SKIKDA, ALGERIA',

    personalSpace: 'PERSONAL SPACE',
    welcome: 'Welcome back',
    subtitle: 'Your personal space with Friends of the Patient Association.',
    member: 'Association Member',
    overview: 'Account overview',
    overviewText: 'Manage your profile and personal preferences.',
    profile: 'Personal profile',
    profileText: 'Your personal information',
    fullName: 'Full name',
    email: 'Email address',
    phone: 'Phone number',
    role: 'Account type',
    notProvided: 'Not provided',
    editProfile: 'Edit information',
    save: 'Save changes',
    cancel: 'Cancel',
    uploadPhoto: 'Change photo',
    removePhoto: 'Remove photo',
    contributions: 'My contributions',
    activitiesText: 'Your participation in association activities.',
    contributionsText: 'Your support for our community.',
    noActivities: 'No activities to display yet.',
    noContributions: 'No contributions to display yet.',
    settings: 'Settings',
    settingsText: 'Customize your account experience.',
    language: 'Language',
    languageText: 'Choose your preferred language.',
    security: 'Account security',
    securityText: 'Keep your account secure.',
    logout: 'Sign out',
    logoutText: 'Sign out of your current account.',
    confirmLogout: 'Are you sure you want to sign out?',
    yesLogout: 'Sign out',
    help: 'Need assistance?',
    helpText: 'We are here if you need help.',
    memberSince: 'Welcome to our community',
    saved: 'Your information has been saved.',
    photoError: 'Please choose an image smaller than 3 MB.',
    nameRequired: 'Please enter your name.',
    settingsNote: 'Your language preference is saved on this device.',
    english: 'English',
    french: 'Français',
    arabic: 'العربية',
  },

  fr: {
    home: 'Accueil',
    about: 'À propos',
    activities: 'Activités',
    map: 'Carte',
    contact: 'Contact',
    account: 'Compte',

    associationName: 'Association des Amis du Malade',
    associationLocation: 'SKIKDA, ALGÉRIE',

    personalSpace: 'ESPACE PERSONNEL',
    welcome: 'Bon retour',
    subtitle: 'Votre espace personnel auprès de l’Association des Amis du Malade.',
    member: 'Membre de l’association',
    overview: 'Aperçu du compte',
    overviewText: 'Gérez votre profil et vos préférences personnelles.',
    profile: 'Profil personnel',
    profileText: 'Vos informations personnelles',
    fullName: 'Nom complet',
    email: 'Adresse e-mail',
    phone: 'Numéro de téléphone',
    role: 'Type de compte',
    notProvided: 'Non renseigné',
    editProfile: 'Modifier les informations',
    save: 'Enregistrer',
    cancel: 'Annuler',
    uploadPhoto: 'Changer la photo',
    removePhoto: 'Supprimer la photo',
    contributions: 'Mes contributions',
    activitiesText: 'Votre participation aux activités de l’association.',
    contributionsText: 'Votre soutien à notre communauté.',
    noActivities: 'Aucune activité à afficher pour le moment.',
    noContributions: 'Aucune contribution à afficher pour le moment.',
    settings: 'Paramètres',
    settingsText: 'Personnalisez votre espace personnel.',
    language: 'Langue',
    languageText: 'Choisissez votre langue préférée.',
    security: 'Sécurité du compte',
    securityText: 'Protégez votre compte.',
    logout: 'Déconnexion',
    logoutText: 'Déconnectez-vous de votre compte.',
    confirmLogout: 'Voulez-vous vraiment vous déconnecter ?',
    yesLogout: 'Se déconnecter',
    help: 'Besoin d’aide ?',
    helpText: 'L’association est à votre écoute.',
    memberSince: 'Bienvenue dans notre communauté',
    saved: 'Vos informations ont été enregistrées.',
    photoError: 'Choisissez une image de moins de 3 Mo.',
    nameRequired: 'Veuillez saisir votre nom.',
    settingsNote: 'Votre langue est enregistrée sur cet appareil.',
    english: 'English',
    french: 'Français',
    arabic: 'العربية',
  },

  ar: {
    home: 'الرئيسية',
    about: 'عن الجمعية',
    activities: 'النشاطات',
    map: 'الخريطة',
    contact: 'اتصل بنا',
    account: 'الحساب',

    associationName: 'جمعية أصدقاء المريض',
    associationLocation: 'سكيكدة، الجزائر',

    personalSpace: 'مساحتي الشخصية',
    welcome: 'مرحبًا بعودتك',
    subtitle: 'مساحتك الشخصية مع جمعية أصدقاء المريض سكيكدة.',
    member: 'عضو في الجمعية',
    overview: 'نظرة عامة على الحساب',
    overviewText: 'تسيير ملفك الشخصي وتفضيلاتك.',
    profile: 'الملف الشخصي',
    profileText: 'معلوماتك الشخصية',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    role: 'نوع الحساب',
    notProvided: 'غير متوفر',
    editProfile: 'تعديل المعلومات',
    save: 'حفظ التغييرات',
    cancel: 'إلغاء',
    uploadPhoto: 'تغيير الصورة',
    removePhoto: 'حذف الصورة',
    contributions: 'مساهماتي',
    activitiesText: 'مشاركتك في نشاطات الجمعية.',
    contributionsText: 'مساهماتك في دعم مجتمعنا.',
    noActivities: 'لا توجد نشاطات لعرضها حاليًا.',
    noContributions: 'لا توجد مساهمات لعرضها حاليًا.',
    settings: 'الإعدادات',
    settingsText: 'خصص تجربتك في الحساب.',
    language: 'اللغة',
    languageText: 'اختر اللغة التي تفضلها.',
    security: 'أمان الحساب',
    securityText: 'حافظ على أمان حسابك.',
    logout: 'تسجيل الخروج',
    logoutText: 'الخروج من حسابك الحالي.',
    confirmLogout: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
    yesLogout: 'تسجيل الخروج',
    help: 'تحتاج إلى مساعدة؟',
    helpText: 'الجمعية هنا لمساعدتك.',
    memberSince: 'مرحبًا بك في مجتمعنا',
    saved: 'تم حفظ معلوماتك.',
    photoError: 'اختر صورة حجمها أقل من 3 ميغابايت.',
    nameRequired: 'يرجى إدخال الاسم.',
    settingsNote: 'يتم حفظ اختيار اللغة على هذا الجهاز.',
    english: 'English',
    french: 'Français',
    arabic: 'العربية',
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('association_language')
      return ['en', 'fr', 'ar'].includes(saved) ? saved : 'en'
    } catch {
      return 'en'
    }
  })

  function setLanguage(nextLanguage) {
    if (!['en', 'fr', 'ar'].includes(nextLanguage)) return
    setLanguageState(nextLanguage)
  }

  useEffect(() => {
    try {
      localStorage.setItem('association_language', language)
    } catch {
      // Language selection still works for the current session.
    }

    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  const value = {
    language,
    setLanguage,
    t: (key) => translations[language][key] ?? translations.en[key] ?? key,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }

  return context
}