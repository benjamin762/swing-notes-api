// config.js throws error to stop server from running without required config.

const PORT = process.env.PORT ?? 3000

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {throw new Error('Database url missing, add to .env')}

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {throw new Error('JWT-secret missing, add to .env')}


export { PORT, DATABASE_URL, JWT_SECRET}

