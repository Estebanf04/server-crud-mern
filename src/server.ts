import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import employeesRouter from './routes'
import { connect } from './config/db'

dotenv.config()
connect()

const app = express()

/* Aqui habilitar CORS cuando llegue el momento */
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/employees', employeesRouter)

export default app

