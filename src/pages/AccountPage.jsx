
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaEdit,
  FaSave,
  FaTimes,
  FaCalendarAlt,
  FaHeart,
  FaGlobe,
  FaShieldAlt,
  FaHeadset,
  FaChevronRight,
  FaCheckCircle,
  FaUserCircle,
  FaSearchPlus,
  FaSearchMinus,
  FaCheck,
} from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext.jsx'
import './AccountPage.css'

const CROP_SIZE = 320
const MAX_FILE_SIZE = 3 * 1024 * 1024

function getStoredUser() {
  try {
    const saved = localStorage.getItem('association_user')

    if (saved) {
      const parsed = JSON.parse(saved)

      if (parsed && typeof parsed === 'object') {
        return parsed
      }
    }
  } catch {
    // Use an empty profile if local storage is unavailable.
  }

  return {}
}

function getInitials(user) {
  const name = user?.nom || user?.name || user?.fullName || 'Member'

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function getStoredPhoto() {
  try {
    return localStorage.getItem('association_profile_photo') || ''
  } catch {
    return ''
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default function AccountPage() {
  const { language, setLanguage, t } = useLanguage()

  const fileInputRef = useRef(null)
  const cropImageRef = useRef(null)
  const dragRef = useRef(null)

  const [user, setUser] = useState(getStoredUser)
  const [photo, setPhoto] = useState(getStoredPhoto)
  const [editing, setEditing] = useState(false)
  const [notice, setNotice] = useState('')

  const [cropSource, setCropSource] = useState('')
  const [cropDimensions, setCropDimensions] = useState(null)
  const [cropScale, setCropScale] = useState(1)
  const [cropZoom, setCropZoom] = useState(1)
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 })
  const [savingPhoto, setSavingPhoto] = useState(false)

  const [form, setForm] = useState(() => {
    const stored = getStoredUser()

    return {
      name: stored?.nom || stored?.name || stored?.fullName || '',
      email: stored?.email || '',
      phone: stored?.telephone || stored?.phone || '',
    }
  })

  useEffect(() => {
    function syncProfile() {
      const stored = getStoredUser()

      setUser(stored)
      setPhoto(getStoredPhoto())
      setForm({
        name: stored?.nom || stored?.name || stored?.fullName || '',
        email: stored?.email || '',
        phone: stored?.telephone || stored?.phone || '',
      })
    }

    window.addEventListener('association-auth-change', syncProfile)
    window.addEventListener('storage', syncProfile)

    return () => {
      window.removeEventListener('association-auth-change', syncProfile)
      window.removeEventListener('storage', syncProfile)
    }
  }, [])

  useEffect(() => {
    if (!cropSource) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') cancelPhotoCrop()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [cropSource, savingPhoto])

  const displayName =
    user?.nom || user?.name || user?.fullName || t('member')

  const email = user?.email || ''
  const phone = user?.telephone || user?.phone || ''
  const role = user?.role || t('member')

  const renderedImageWidth = cropDimensions
    ? cropDimensions.width * cropScale * cropZoom
    : 0

  const renderedImageHeight = cropDimensions
    ? cropDimensions.height * cropScale * cropZoom
    : 0

  function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    if (!file.type.startsWith('image/') || file.size > MAX_FILE_SIZE) {
      setNotice(t('photoError'))
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      const image = String(reader.result || '')

      if (!image) {
        setNotice(t('photoError'))
        return
      }

      setCropDimensions(null)
      setCropZoom(1)
      setCropPosition({ x: 0, y: 0 })
      setCropSource(image)
      setNotice('')
    }

    reader.onerror = () => setNotice(t('photoError'))
    reader.readAsDataURL(file)
  }

  function handleCropImageLoad(event) {
    const image = event.currentTarget
    const width = image.naturalWidth
    const height = image.naturalHeight

    if (!width || !height) {
      setNotice(t('photoError'))
      cancelPhotoCrop()
      return
    }

    const scale = CROP_SIZE / Math.min(width, height)
    const renderedWidth = width * scale
    const renderedHeight = height * scale

    setCropDimensions({ width, height })
    setCropScale(scale)
    setCropZoom(1)
    setCropPosition({
      x: (CROP_SIZE - renderedWidth) / 2,
      y: (CROP_SIZE - renderedHeight) / 2,
    })
  }

  function handleCropPointerDown(event) {
    if (!cropDimensions || savingPhoto) return

    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)

    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      imageX: cropPosition.x,
      imageY: cropPosition.y,
    }
  }

  function handleCropPointerMove(event) {
    if (!dragRef.current || !cropDimensions) return

    const drag = dragRef.current
    const nextX = drag.imageX + event.clientX - drag.pointerX
    const nextY = drag.imageY + event.clientY - drag.pointerY

    setCropPosition({
      x: clamp(nextX, CROP_SIZE - renderedImageWidth, 0),
      y: clamp(nextY, CROP_SIZE - renderedImageHeight, 0),
    })
  }

  function handleCropPointerUp() {
    dragRef.current = null
  }

  function handleZoomChange(event) {
    if (!cropDimensions) return

    const nextZoom = Number(event.target.value)
    const oldWidth = renderedImageWidth
    const oldHeight = renderedImageHeight
    const nextWidth = cropDimensions.width * cropScale * nextZoom
    const nextHeight = cropDimensions.height * cropScale * nextZoom

    const centerX = (CROP_SIZE / 2 - cropPosition.x) / oldWidth
    const centerY = (CROP_SIZE / 2 - cropPosition.y) / oldHeight

    setCropZoom(nextZoom)

    setCropPosition({
      x: clamp(
        CROP_SIZE / 2 - centerX * nextWidth,
        CROP_SIZE - nextWidth,
        0,
      ),
      y: clamp(
        CROP_SIZE / 2 - centerY * nextHeight,
        CROP_SIZE - nextHeight,
        0,
      ),
    })
  }

  function cancelPhotoCrop() {
    if (savingPhoto) return

    setCropSource('')
    setCropDimensions(null)
    setCropZoom(1)
    setCropPosition({ x: 0, y: 0 })
    dragRef.current = null
  }

  function handleConfirmCrop() {
    if (!cropSource || !cropDimensions || savingPhoto) return

    const image = cropImageRef.current
    if (!image) return

    setSavingPhoto(true)

    try {
      const scale = cropScale * cropZoom
      const sourceX = clamp(-cropPosition.x / scale, 0, cropDimensions.width)
      const sourceY = clamp(-cropPosition.y / scale, 0, cropDimensions.height)
      const sourceSize = CROP_SIZE / scale

      const cropWidth = Math.min(
        sourceSize,
        cropDimensions.width - sourceX,
      )

      const cropHeight = Math.min(
        sourceSize,
        cropDimensions.height - sourceY,
      )

      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512

      const context = canvas.getContext('2d')

      if (!context) {
        setNotice(t('photoError'))
        return
      }

      context.clearRect(0, 0, canvas.width, canvas.height)

      context.drawImage(
        image,
        sourceX,
        sourceY,
        cropWidth,
        cropHeight,
        0,
        0,
        canvas.width,
        canvas.height,
      )

      const croppedPhoto = canvas.toDataURL('image/jpeg', 0.9)

      localStorage.setItem('association_profile_photo', croppedPhoto)

      setPhoto(croppedPhoto)
      setNotice('')
      setCropSource('')
      setCropDimensions(null)
      setCropZoom(1)
      setCropPosition({ x: 0, y: 0 })
    } catch {
      setNotice(t('photoError'))
    } finally {
      setSavingPhoto(false)
    }
  }

  function handleRemovePhoto() {
    try {
      localStorage.removeItem('association_profile_photo')
      setPhoto('')
      setNotice('')
    } catch {
      setNotice(t('photoError'))
    }
  }

  function handleSaveProfile(event) {
    event.preventDefault()

    if (!form.name.trim()) {
      setNotice(t('nameRequired'))
      return
    }

    const updatedUser = {
      ...(user || {}),
      nom: form.name.trim(),
      name: form.name.trim(),
      fullName: form.name.trim(),
      email: form.email.trim(),
      telephone: form.phone.trim(),
      phone: form.phone.trim(),
    }

    try {
      localStorage.setItem('association_user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setEditing(false)
      setNotice(t('saved'))
      window.dispatchEvent(new Event('association-auth-change'))
    } catch {
      setNotice(t('photoError'))
    }
  }

  function handleCancelEdit() {
    setForm({
      name: user?.nom || user?.name || user?.fullName || '',
      email: user?.email || '',
      phone: user?.telephone || user?.phone || '',
    })

    setEditing(false)
    setNotice('')
  }

  return (
    <div className="account-page">
      <div className="account-page-container">
        <section className="account-hero">
          <div className="account-hero-decoration" aria-hidden="true" />

          <div className="account-hero-copy">
            <span className="account-eyebrow">{t('personalSpace')}</span>

            <h1>
              {t('welcome')},{' '}
              <span>{displayName.split(' ')[0]}</span>
            </h1>

            <p>{t('subtitle')}</p>

            <div className="account-member-tag">
              <FaCheckCircle aria-hidden="true" />
              <span>{role}</span>
            </div>
          </div>

          <div className="account-hero-image" aria-hidden="true">
            <img src="/association-logo.png" alt="" />
          </div>

          <div className="account-hero-avatar">
            {photo ? (
              <img src={photo} alt={displayName} />
            ) : (
              <span>{getInitials(user)}</span>
            )}

            <button
              type="button"
              className="account-camera-button"
              onClick={() => fileInputRef.current?.click()}
              aria-label={t('uploadPhoto')}
              title={t('uploadPhoto')}
            >
              <FaCamera aria-hidden="true" />
            </button>

            <input
              ref={fileInputRef}
              className="account-hidden-file"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              aria-label={t('uploadPhoto')}
            />
          </div>
        </section>

        <div className="account-hero-photo-actions">
          <button
            type="button"
            className="account-text-button"
            onClick={() => fileInputRef.current?.click()}
          >
            <FaCamera aria-hidden="true" />
            {t('uploadPhoto')}
          </button>

          {photo && (
            <button
              type="button"
              className="account-text-button account-remove-photo"
              onClick={handleRemovePhoto}
            >
              {t('removePhoto')}
            </button>
          )}
        </div>

        {notice && (
          <div className="account-notice" role="status">
            {notice}
          </div>
        )}

        <div className="account-content-grid">
          <aside className="account-sidebar">
            <div className="account-sidebar-heading">
              <span className="account-sidebar-avatar">
                {photo ? (
                  <img src={photo} alt="" />
                ) : (
                  <FaUserCircle aria-hidden="true" />
                )}
              </span>

              <div>
                <strong>{displayName}</strong>
                <span>{email || t('notProvided')}</span>
              </div>
            </div>

            <nav className="account-sidebar-nav" aria-label={t('overview')}>
              <a href="#profile" className="account-side-link active">
                <FaUser aria-hidden="true" />
                <span>{t('profile')}</span>
                <FaChevronRight
                  className="account-side-chevron"
                  aria-hidden="true"
                />
              </a>

              <a href="#activities" className="account-side-link">
                <FaCalendarAlt aria-hidden="true" />
                <span>{t('activities')}</span>
                <FaChevronRight
                  className="account-side-chevron"
                  aria-hidden="true"
                />
              </a>

              <a href="#contributions" className="account-side-link">
                <FaHeart aria-hidden="true" />
                <span>{t('contributions')}</span>
                <FaChevronRight
                  className="account-side-chevron"
                  aria-hidden="true"
                />
              </a>

              <a href="#settings" className="account-side-link">
                <FaShieldAlt aria-hidden="true" />
                <span>{t('settings')}</span>
                <FaChevronRight
                  className="account-side-chevron"
                  aria-hidden="true"
                />
              </a>
            </nav>

            <div className="account-sidebar-help">
              <span className="account-help-icon">
                <FaHeadset aria-hidden="true" />
              </span>

              <strong>{t('help')}</strong>
              <p>{t('helpText')}</p>

              <Link to="/contact">
                {t('contact')}
                <FaChevronRight aria-hidden="true" />
              </Link>
            </div>
          </aside>

          <main className="account-main">
            <section className="account-section-intro">
              <span className="account-eyebrow">{t('personalSpace')}</span>
              <h2>{t('overview')}</h2>
              <p>{t('overviewText')}</p>
            </section>

            <section className="account-stats-grid">
              <article className="account-stat-card">
                <span className="account-stat-icon blue">
                  <FaCalendarAlt aria-hidden="true" />
                </span>

                <div>
                  <strong>—</strong>
                  <span>{t('activities')}</span>
                </div>
              </article>

              <article className="account-stat-card">
                <span className="account-stat-icon red">
                  <FaHeart aria-hidden="true" />
                </span>

                <div>
                  <strong>—</strong>
                  <span>{t('contributions')}</span>
                </div>
              </article>
            </section>

            <section className="account-panel" id="profile">
              <div className="account-panel-heading">
                <div className="account-panel-title">
                  <span className="account-panel-icon">
                    <FaUser aria-hidden="true" />
                  </span>

                  <div>
                    <h3>{t('profile')}</h3>
                    <p>{t('profileText')}</p>
                  </div>
                </div>

                {!editing ? (
                  <button
                    type="button"
                    className="account-outline-button"
                    onClick={() => {
                      setNotice('')
                      setEditing(true)
                    }}
                  >
                    <FaEdit aria-hidden="true" />
                    {t('editProfile')}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="account-outline-button"
                    onClick={handleCancelEdit}
                  >
                    <FaTimes aria-hidden="true" />
                    {t('cancel')}
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProfile}>
                <div className="account-fields-grid">
                  <label className="account-field">
                    <span>{t('fullName')}</span>

                    <span className="account-input-wrap">
                      <FaUser aria-hidden="true" />

                      <input
                        type="text"
                        value={form.name}
                        disabled={!editing}
                        onChange={(event) =>
                          setForm({ ...form, name: event.target.value })
                        }
                        autoComplete="name"
                      />
                    </span>
                  </label>

                  <label className="account-field">
                    <span>{t('email')}</span>

                    <span className="account-input-wrap">
                      <FaEnvelope aria-hidden="true" />

                      <input
                        type="email"
                        value={form.email}
                        disabled={!editing}
                        onChange={(event) =>
                          setForm({ ...form, email: event.target.value })
                        }
                        autoComplete="email"
                      />
                    </span>
                  </label>

                  <label className="account-field">
                    <span>{t('phone')}</span>

                    <span className="account-input-wrap">
                      <FaPhone aria-hidden="true" />

                      <input
                        type="tel"
                        value={form.phone}
                        disabled={!editing}
                        onChange={(event) =>
                          setForm({ ...form, phone: event.target.value })
                        }
                        autoComplete="tel"
                      />
                    </span>
                  </label>

                  <label className="account-field">
                    <span>{t('role')}</span>

                    <span className="account-input-wrap">
                      <FaShieldAlt aria-hidden="true" />
                      <input type="text" value={role} disabled />
                    </span>
                  </label>
                </div>

                {editing && (
                  <div className="account-form-actions">
                    <button
                      type="button"
                      className="account-cancel-button"
                      onClick={handleCancelEdit}
                    >
                      {t('cancel')}
                    </button>

                    <button type="submit" className="account-primary-button">
                      <FaSave aria-hidden="true" />
                      {t('save')}
                    </button>
                  </div>
                )}
              </form>
            </section>

            <div className="account-lower-grid">
              <section
                className="account-panel account-compact-panel"
                id="activities"
              >
                <div className="account-panel-heading">
                  <div className="account-panel-title">
                    <span className="account-panel-icon blue">
                      <FaCalendarAlt aria-hidden="true" />
                    </span>

                    <div>
                      <h3>{t('activities')}</h3>
                      <p>{t('activitiesText')}</p>
                    </div>
                  </div>
                </div>

                <div className="account-empty-state">
                  <FaCalendarAlt aria-hidden="true" />
                  <p>{t('noActivities')}</p>
                </div>
              </section>

              <section
                className="account-panel account-compact-panel"
                id="contributions"
              >
                <div className="account-panel-heading">
                  <div className="account-panel-title">
                    <span className="account-panel-icon red">
                      <FaHeart aria-hidden="true" />
                    </span>

                    <div>
                      <h3>{t('contributions')}</h3>
                      <p>{t('contributionsText')}</p>
                    </div>
                  </div>
                </div>

                <div className="account-empty-state">
                  <FaHeart aria-hidden="true" />
                  <p>{t('noContributions')}</p>
                </div>
              </section>
            </div>

            <section
              className="account-panel account-settings-panel"
              id="settings"
            >
              <div className="account-panel-heading">
                <div className="account-panel-title">
                  <span className="account-panel-icon">
                    <FaShieldAlt aria-hidden="true" />
                  </span>

                  <div>
                    <h3>{t('settings')}</h3>
                    <p>{t('settingsText')}</p>
                  </div>
                </div>
              </div>

              <div className="account-setting-row">
                <span className="account-setting-icon">
                  <FaGlobe aria-hidden="true" />
                </span>

                <div className="account-setting-copy">
                  <strong>{t('language')}</strong>
                  <p>{t('languageText')}</p>
                </div>

                <select
                  className="account-language-select"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  aria-label={t('language')}
                >
                  <option value="en">{t('english')}</option>
                  <option value="fr">{t('french')}</option>
                  <option value="ar">{t('arabic')}</option>
                </select>
              </div>

              <p className="account-settings-note">{t('settingsNote')}</p>
            </section>
          </main>
        </div>
      </div>

      {cropSource && (
        <div
          className="account-crop-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) cancelPhotoCrop()
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            background: 'rgba(20, 28, 40, 0.72)',
            backdropFilter: 'blur(5px)',
            overflowY: 'auto',
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-crop-title"
            style={{
              width: '100%',
              maxWidth: 430,
              boxSizing: 'border-box',
              padding: 24,
              borderRadius: 20,
              background: '#fff',
              color: '#25282d',
              boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                marginBottom: 8,
              }}
            >
              <h2
                id="account-crop-title"
                style={{ margin: 0, fontSize: 21, fontWeight: 750 }}
              >
                {t('uploadPhoto')}
              </h2>

              <button
                type="button"
                onClick={cancelPhotoCrop}
                disabled={savingPhoto}
                aria-label={t('cancel')}
                style={{
                  width: 36,
                  height: 36,
                  flexShrink: 0,
                  display: 'grid',
                  placeItems: 'center',
                  border: '1px solid #e7e9ed',
                  borderRadius: '50%',
                  background: '#fff',
                  color: '#6d6e71',
                  cursor: 'pointer',
                }}
              >
                <FaTimes />
              </button>
            </div>

            <p
              style={{
                margin: '0 0 20px',
                color: '#6d6e71',
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              Drag the image to choose the visible area. Zoom in or out, then
              confirm your crop.
            </p>

            <div
              style={{
                width: 'min(100%, 320px)',
                aspectRatio: '1 / 1',
                position: 'relative',
                margin: '0 auto',
                overflow: 'hidden',
                borderRadius: 12,
                background: '#eef7fd',
                touchAction: 'none',
                cursor: cropDimensions ? 'grab' : 'wait',
                userSelect: 'none',
              }}
              onPointerDown={handleCropPointerDown}
              onPointerMove={handleCropPointerMove}
              onPointerUp={handleCropPointerUp}
              onPointerCancel={handleCropPointerUp}
              onLostPointerCapture={handleCropPointerUp}
            >
              <img
                ref={cropImageRef}
                src={cropSource}
                alt="Image to crop"
                draggable="false"
                onLoad={handleCropImageLoad}
                style={{
                  position: 'absolute',
                  display: cropDimensions ? 'block' : 'none',
                  width: renderedImageWidth,
                  height: renderedImageHeight,
                  maxWidth: 'none',
                  maxHeight: 'none',
                  left: cropPosition.x,
                  top: cropPosition.y,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              />

              {!cropDimensions && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'grid',
                    placeItems: 'center',
                    color: '#6d6e71',
                    fontSize: 13,
                  }}
                >
                  Loading image…
                </div>
              )}

              {cropDimensions && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: '2px solid rgba(255,255,255,0.95)',
                    borderRadius: '50%',
                    boxShadow: '0 0 0 999px rgba(0,0,0,0.25)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>

            <p
              style={{
                margin: '12px 0 18px',
                textAlign: 'center',
                color: '#6d6e71',
                fontSize: 12,
              }}
            >
              Drag to position the photo
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 22,
              }}
            >
              <FaSearchMinus
                aria-hidden="true"
                style={{ color: '#6d6e71', flexShrink: 0 }}
              />

              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={cropZoom}
                onChange={handleZoomChange}
                disabled={!cropDimensions || savingPhoto}
                aria-label="Zoom image"
                style={{
                  width: '100%',
                  accentColor: '#e30613',
                  cursor: 'pointer',
                }}
              />

              <FaSearchPlus
                aria-hidden="true"
                style={{ color: '#6d6e71', flexShrink: 0 }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: 12,
                marginBottom: 20,
                border: '1px solid #e7e9ed',
                borderRadius: 12,
                background: '#fff',
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  flexShrink: 0,
                  overflow: 'hidden',
                  borderRadius: '50%',
                  border: '2px solid #e30613',
                  background: '#eef7fd',
                  position: 'relative',
                }}
              >
                {cropDimensions && (
                  <img
                    src={cropSource}
                    alt="Circular avatar preview"
                    draggable="false"
                    style={{
                      position: 'absolute',
                      width:
                        cropDimensions.width *
                        cropScale *
                        cropZoom *
                        (60 / CROP_SIZE),
                      height:
                        cropDimensions.height *
                        cropScale *
                        cropZoom *
                        (60 / CROP_SIZE),
                      maxWidth: 'none',
                      maxHeight: 'none',
                      left: cropPosition.x * (60 / CROP_SIZE),
                      top: cropPosition.y * (60 / CROP_SIZE),
                    }}
                  />
                )}
              </div>

              <div style={{ minWidth: 0 }}>
                <strong style={{ display: 'block', fontSize: 13 }}>
                  Circular profile photo
                </strong>

                <span
                  style={{
                    display: 'block',
                    marginTop: 4,
                    color: '#6d6e71',
                    fontSize: 12,
                    lineHeight: 1.5,
                  }}
                >
                  This is how your avatar will appear.
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={cancelPhotoCrop}
                disabled={savingPhoto}
                style={{
                  minHeight: 42,
                  padding: '0 16px',
                  border: '1px solid #e7e9ed',
                  borderRadius: 10,
                  background: '#fff',
                  color: '#6d6e71',
                  fontWeight: 650,
                  cursor: 'pointer',
                }}
              >
                {t('cancel')}
              </button>

              <button
                type="button"
                onClick={handleConfirmCrop}
                disabled={!cropDimensions || savingPhoto}
                style={{
                  minHeight: 42,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '0 18px',
                  border: '1px solid #e30613',
                  borderRadius: 10,
                  background:
                    !cropDimensions || savingPhoto ? '#bd8b8e' : '#e30613',
                  color: '#fff',
                  fontWeight: 700,
                  cursor:
                    !cropDimensions || savingPhoto ? 'wait' : 'pointer',
                }}
              >
                <FaCheck aria-hidden="true" />
                {savingPhoto ? 'Saving…' : 'Confirm photo'}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
