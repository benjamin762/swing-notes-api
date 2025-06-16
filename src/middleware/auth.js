import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../utils/config.js';

function authenticate (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){return res.status(400).json({error:'Authorisation token missing.'})}

    const user = jwt.verify(token, JWT_SECRET)
console.log(user)
    res.locals.user = user

    // try catch

    
    next()
}

export default authenticate