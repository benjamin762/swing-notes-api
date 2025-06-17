import express from 'express'
import authenticate from '../middleware/auth.js'
import {getNotes, newNote, getNote, changeNote, deleteNote, searchNote} from '../controllers/notes.js'

const router = express.Router()

// Protect all routes.
router.use(authenticate)

router.get("/notes", getNotes)
router.post("/notes", newNote)

router.get("/notes/:id", getNote)
router.put("/notes/:id", changeNote)
router.delete("/notes/:id", deleteNote)

router.get("/notes/search", searchNote)


export default router