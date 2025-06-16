import { Pool } from 'pg'
import { DATABASE } from './config.js'

const pool = new Pool({
    ...DATABASE
})

export default pool