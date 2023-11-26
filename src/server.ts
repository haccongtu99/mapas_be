import authRouter from '@/auth/auth.route'
import productCategoryRouter from '@/categories/productCategory/product-category.route'
import uploadRouter from '@/files/file.route'
import productRouter from '@/products/product.route'
import userRouter from '@/users/user.route'
import projectRouter from '@/projects/project.route'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { startServer } from './configs/db.config'
import { errorHandlerMiddleware } from './middlewares/errors/errorHandlers'
import { notFoundMiddleware } from './middlewares/errors/notFound'

// Access environment variables
dotenv.config()

// Initialize app with express
const app: Application = express()

// Load App Middleware
app.use(helmet())
app.use(cors())
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

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
