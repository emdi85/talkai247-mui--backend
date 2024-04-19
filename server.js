import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import apiRoutes from './routes/apiRoutes.js'
import userRoutes from './routes/userRoutes.js'

const __dirname__ = path.resolve()
dotenv.config()
if (process.env.NODE_ENV === undefined) {
  dotenv.config({ path: '../.env' })
}
// Connect to database
connectDB()

const app = express()
app.use(express.json())
app.use(cors({origin: '*'}))

app.use('/api/user', userRoutes)
app.use('/api/v1', apiRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname__, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname__, 'frontend', 'build', 'index.html'))
  )
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
  )
)
