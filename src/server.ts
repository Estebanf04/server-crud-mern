import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import employeesRouter from './routes'
import { connect } from './config/db'
import cors from 'cors'
import swagger, {swaggerUiOptions} from './config/swagger'
import swaggerUi from 'swagger-ui-express'

dotenv.config()
connect()

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/employees', employeesRouter)

// Documentacion API con Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger, swaggerUiOptions))

export default app

