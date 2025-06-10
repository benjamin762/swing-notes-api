import express from 'express'
import authenticate from '../middleware/auth.js'
import {getNotes, getNote, newNote, changeNote, deleteNote, searchNote} from '../controllers/notes.js'

const router = express.Router()

// Protect all routes.
router.use(authenticate)

// requirements
router.get("/notes", getNotes)
router.post("/notes", newNote)
router.put("/notes", changeNote)
router.delete("/notes", deleteNote)

router.get("/notes/search", searchNote)

// extra
router.get("/notes/:id", getNote)

export default router