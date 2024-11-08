import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRouter.js";
import bannerRoute from "./routes/bannerRoute.js";
import cartRouter from "./routes/cartRouter.js";
import paymentRoute from "./routes/payment.js";
import orderRouter from "./routes/orderRoute.js";

// App config//

const app=express();
const port=process.env.PORT|| 4000
connectDB();
connectCloudinary()

// middreware //
app.use(express.json())
app.use(cors())


// api end point 
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/banner', bannerRoute)
app.use('/api/cart', cartRouter)
app.use('/api/payment', paymentRoute)
app.use('/api/order', orderRouter)



app.listen(port,()=>console.log('Server Started on PORT :'+ port))