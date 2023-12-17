import authRouter from '@/auth/auth.route'
import productCategoryRouter from '@/categories/productCategory/product-category.route'
import uploadRouter from '@/files/file.route'
import productRouter from '@/products/product.route'
import userRouter from '@/users/user.route'
import projectRouter from '@/projects/project.route'
import clientRouter from '@/clients/client.route'
import cors, { CorsOptions } from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { startServer } from './configs/db.config'
import { errorHandlerMiddleware } from './middlewares/errors/errorHandlers'
import { notFoundMiddleware } from './middlewares/errors/notFound'
import { enviromentConfig } from './configs/env.config'

// Access environment variables
dotenv.config()

// Initialize app with express
const app: Application = express()

// Load App Middleware
app.use(helmet())
app.use(
  cors({
    origin: enviromentConfig.WHITE_LIST, // Replace with your client application's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // Enable credentials (cookies, authorization headers) for cross-origin requests
  })
)
app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Connect database
startServer(app)

// Router
app.use('/v1', userRouter)
app.use('/v1', authRouter)
app.use('/v1', uploadRouter)
app.use('/v1', productRouter)
app.use('/v1', productCategoryRouter)
app.use('/v1', projectRouter)
app.use('/v1', clientRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
