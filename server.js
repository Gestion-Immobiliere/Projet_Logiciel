import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import authRoutes from './routes/authRoutes.js' // 🔑
import biensRoutes from "./routes/biensRoutes.js"
import metaRoutes from "./routes/metaRoutes.js"
import reviewRoutes from "./routes/reviewsRoutes.js"
import { Server } from 'socket.io'
import http from 'http';

// import Message from './models/Message.js'
import socket from './socket/socket.js'

const port = process.env.PORT || 4000


const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000", // autorise le front à y accéder
    methods: ['GET', 'POST'],
  }
});


socket(io);

// Connection à MongoDB et Cloudinary
connectDB()
connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/auth', authRoutes)
app.use("/api/biens", biensRoutes)
app.use("/api/meta", metaRoutes)
app.use("/api/reviews", reviewRoutes);

app.get('/', (req, res) => {
  res.send('API working!!')
})

// Middleware d’erreur simple
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Une erreur s’est produite", error: err.message })
})

app.listen(port, () => console.log(`✅ Server started on port ${port}`))
