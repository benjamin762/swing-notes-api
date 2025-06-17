import pool from "../utils/db.js"
import {v7 as createId} from 'uuid'

async function getNotes(req, res) {
    // Get all notes for user.
    const result = await pool.query(
        'SELECT id, title, text, "createdAt", "modifiedAt" FROM notes WHERE username = $1',
        [res.locals.user.username]
    )

    res.status(200).json({notes: result.rows})

}
function newNote(req, res) {
    const username = res.locals.user.username
    const {title, text} = req.body
    const id = createId()

    pool.query(
        'INSERT INTO notes (id, username, title, text, "createdAt", "modifiedAt") VALUES ($1, $2, $3, $4, $5, $6)', 
        [id, username, title, text, new Date(), new Date()]
    );

    res.status(201).json({message:'Note created', id})
}

async function getNote(req, res) {
    const result = await pool.query(
        'SELECT id, title, text, "createdAt", "modifiedAt" FROM notes WHERE username = $1 AND id = $2',
        [res.locals.user.username, req.params.id]
    )
    if (result.rowCount > 0) {
        res.status(200).json(result.rows[0])
    } else {
        res.status(404).json({error:'Not found.'})
    }
}
async function changeNote(req, res) {
    // Change title and text of a note. Don't allow changing id, username or createdAt. Update modifiedAt.

    const username = res.locals.user.username
    const {id, title: newTitle, text: newText} = req.body

    const result = await pool.query(
        'UPDATE notes SET title = $1, text = $2, "modifiedAt" = $3 WHERE id = $4 AND username = $5',
        [newTitle, newText, new Date(), id, username]
    )
    if (result.rowCount > 0) {
        res.status(200).json({message: 'Note changed'})
    } else {
        res.status(400).json({error: 'No note changed. Wrong id?'})
    }
}
async function deleteNote(req, res) {
    const username = res.locals.user.username
    const {id} = req.params

    const result = await pool.query(
        'DELETE FROM notes WHERE id = $1 AND username = $2',
        [id, username]
    )
    console.log(result)
    if (result.rowCount > 0) {
        res.status(200).json({message:'Note deleted', id})
    } else {
        res.status(404).json({error: 'Not found'})
    }
}
async function searchNote(req, res) {
    const user = res.locals.user.username
    const query = req.body.params.query['q']

    // select psql search from title in notes

    res.status(200).json({})
}

export {getNotes, newNote, getNote, changeNote, deleteNote, searchNote}