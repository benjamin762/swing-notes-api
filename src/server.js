import express from 'express'
import { PORT } from './utils/config.js'
import publicRoutes from './routes/public.js'
import protectedRoutes from './routes/protected.js'

const app = express()
app.use(express.json())

app.use("/api", publicRoutes)
app.use("/api", protectedRoutes)

app.listen(PORT, () => console.log('Servern körs på http://localhost:3000.'))