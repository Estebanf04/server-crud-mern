import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import employeesRouter from './routes'
import { connect } from './config/db'
import cors from 'cors'
import { corsConfig } from './config/cors'

dotenv.config()
connect()

const app = express()

app.use(cors()) // Habilitar CORS
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/employees', employeesRouter)

export default app

