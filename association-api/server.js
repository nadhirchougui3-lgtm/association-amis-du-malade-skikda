
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(helmet())

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header, such as local health checks.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Origin not allowed by CORS'))
    },
  }),
)

app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Association API is running',
    database:
      mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

// Authentication routes
app.use('/api/auth', authRoutes)

// Not found
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  })
})

// Error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err.message === 'Origin not allowed by CORS') {
    return res.status(403).json({
      message: 'Origin not allowed',
    })
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      message: 'Request body is too large.',
    })
  }

  console.error('Server error:', err.message)

  return res.status(500).json({
    message: 'Internal server error',
  })
})

async function startServer() {
  if (!process.env.MONGODB_URI) {
    console.error('Startup failed: MONGODB_URI is not configured.')
    process.exit(1)
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error(
      'Startup failed: JWT_SECRET must contain at least 32 characters.',
    )
    process.exit(1)
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })

    console.log('MongoDB connected successfully.')

    app.listen(PORT, () => {
      console.log(`Association API running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

startServer()
