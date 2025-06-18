import pool from "../utils/db.js"
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { JWT_SECRET } from "../utils/config.js"

async function userSignup (req, res) {
    const { username, password } = req.body
    if (!username || !password) {return res.status(400).json({error: 'Username or password missing.'})}

    // Möjlig förbättring: https://chatgpt.com/share/68500c95-8c40-8013-825a-6ce5e4efa983
    const result = await pool.query(`SELECT 1 FROM users WHERE username = $1`, [username])
    if(result.rows.length > 0) {return res.status(500).json({error: 'Username already taken.'})}
    
    const hash = await bcrypt.hash(password, 14)
    
    const newUser = {username, password: hash, role: 'user'}
    
    await pool.query(
        `INSERT INTO users (username, password, role) VALUES ($1, $2, $3)`,
        [username, hash, 'user']
    );

    res.status(201).json({message:'User created.', username})
}
async function userLogin (req, res) {
    const { username, password } = req.body
    if (!username || !password) {return res.status(400).json({error:'Username or password missing.'})}


    const result = await pool.query(`SELECT username, password, role FROM users WHERE username = $1`, [username])
    const user = result.rows[0]
    if (!user) {return res.status(400).json({error:'User missing.'})}
    
    const passwordCorrect = await bcrypt.compare(password, user.password)
    if(!passwordCorrect) {
        return res.status(401).json({error:'Wrong password.'})
    }
    
    const token = JWT.sign(
        {
            username: user.username, 
            role: user.role
        },
        JWT_SECRET,
        {expiresIn: '1h'}
    )
    
    res.status(200).json({message:'Login ok. new token', token })
}

export {userSignup, userLogin}