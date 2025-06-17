import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/config.js';

function authenticate (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){return res.status(400).json({error:'Authorisation token missing.'})}

    try {
        const user = jwt.verify(token, JWT_SECRET)
        res.locals.user = user
        next()

    } catch (error) {
        return res.status(403).json({error:'Invalid token.'})
    }
}

export default authenticate