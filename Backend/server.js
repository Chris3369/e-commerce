import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import authRoute from './routes/auth.route.js'
import productRoute from './routes/product.route.js'
// import cartRoute from './routes/cart.route.js'
// import couponRoute from './routes/coupon.route.js'
// import paymentRoute from './routes/payment.route.js'
import { connectDB } from './lib/db.js'

dotenv.config()

const app = express()

app.use(cors())

// allows you to parse the body of the request
app.use(express.json({ limit: "10mb" }));

app.use(cookieParser())

// app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
// app.use('/api/cart', cartRoute)
// app.use('/api/coupons', couponRoute)
// app.use('/api/payment', paymentRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
    connectDB()
})