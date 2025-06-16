import express from 'express'
import { PORT } from './utils/config.js'
import publicRoutes from './routes/public.js'
import protectedRoutes from './routes/protected.js'
import swaggerRoutes from './routes/swagger.js'

const app = express()
app.use(express.json())

app.use("/api", publicRoutes)
app.use("/api", protectedRoutes)

app.use("/", swaggerRoutes)

app.listen(PORT, () => console.log('Servern körs på http://localhost:3000.'))