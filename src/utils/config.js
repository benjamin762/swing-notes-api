// config.js throws error to stop server from running without required config.

const PORT = process.env.PORT ?? 3000


const DATABASE = {
    user: process.env.PGUSER,
    host: process.env.PGHOST ?? 'localhost',
    database: process.env.PGDATABASE ?? 'swing-notes',
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT ?? '5432',
}
// Check if any value in DATABASE is undefined.
if (Object.values(DATABASE).some(value => !value)) {throw new Error('Database details missing, see readme for .env')}

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {throw new Error('JWT-secret missing, add to .env')}


export { PORT, DATABASE, JWT_SECRET}

