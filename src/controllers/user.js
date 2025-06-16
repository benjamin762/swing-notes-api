import pool from "../utils/db.js"
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { JWT_SECRET } from "../utils/config.js"

async function userSignup (req, res) {
    const { username, password } = req.body
    if (!username || !password) {return res.status(400).json({error: 'Username or password missing.'})}

    const result = await pool.query(`SELECT 1 FROM users WHERE username = $1`, [username])
    if(result.length > 0) {return res.status(500).json({error: 'Username already taken.'})}

    const hash =  await bcrypt.hash(password, 14)

    const newUser = {username, password: hash, role: 'user'}

    await pool.query(`INSERT INTO`, [username, hash, 'user'])
    // spara anv
    res.status(201).json({message:'User created.', username})
}
async function userLogin (req, res) {
    // const { username, password } = req.body
    // if (!username || !password) {return res.status(400).json({error:'Username or password missing.'})}

    const result = pool.query(`SELECT 1`)
    res.send(result)
    return
    // const result = pool.query(`SELECT username, password, role FROM users WHERE username = $1`, [username])
    // const user = result[0]
    // if !user

    const hash = bcrypt.hash(password, 14)
    if(hash !== user.password) {
        res.status('403?not auht').json({error:'Wrong password.'})
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