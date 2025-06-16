import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../utils/config.js';

function authenticate (req, res, next) {
    const token = req.headers.authorize;
    if(!token){res.status(400).json({error:'Authorisation missing.'})}

    // const user = jwt.verify(token, JWT_SECRET)

    // res.locals.user = user

    // try catch

    
    next()
}

export default authenticate