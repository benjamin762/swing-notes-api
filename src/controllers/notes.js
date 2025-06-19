import pool from "../utils/db.js"
import {v7 as createId} from 'uuid'

async function getNotes(req, res) {
    try {
        // Get all notes for user.
        const result = await pool.query(
            'SELECT id, title, text, "createdAt", "modifiedAt" FROM notes WHERE username = $1',
            [res.locals.user.username]
        )

        res.status(200).json({notes: result.rows})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Error querying database.'})
    }
}
async function newNote(req, res) {
    const username = res.locals.user.username
    const {title, text} = req.body
    const id = createId()

    try {
        await pool.query(
            'INSERT INTO notes (id, username, title, text, "createdAt", "modifiedAt") VALUES ($1, $2, $3, $4, $5, $6)', 
            [id, username, title, text, new Date(), new Date()]
        );
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'Error querying database.'})
    }
    
    res.status(201).json({message:'Note created', id})
}

async function getNote(req, res) {
    try {
        const result = await pool.query(
            'SELECT id, title, text, "createdAt", "modifiedAt" FROM notes WHERE username = $1 AND id = $2',
            [res.locals.user.username, req.params.id]
        )
        if (result.rowCount > 0) {
            res.status(200).json(result.rows[0])
        } else {
            res.status(404).json({error:'Not found.'})
        }
    } catch (error) {
        return res.status(500).json({error: 'Error querying database.'})
    }
}
async function changeNote(req, res) {
    // Change title and text of a note. Don't allow changing id, username or createdAt. Update modifiedAt.
    try {
        const username = res.locals.user.username
        const id = req.params.id
        const {title: newTitle, text: newText} = req.body

        const result = await pool.query(
            'UPDATE notes SET title = $1, text = $2, "modifiedAt" = $3 WHERE id = $4 AND username = $5',
            [newTitle, newText, new Date(), id, username]
        )
        if (result.rowCount > 0) {
            res.status(200).json({message: 'Note changed'})
        } else {
            res.status(400).json({error: 'No note changed. Wrong id?'})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Error querying database.'})
    }
}
async function deleteNote(req, res) {
    try {
        const username = res.locals.user.username
        const {id} = req.params
        
        const result = await pool.query(
            'DELETE FROM notes WHERE id = $1 AND username = $2',
            [id, username]
        )
        if (result.rowCount > 0) {
            res.status(200).json({message:'Note deleted', id})
        } else {
            res.status(404).json({error: 'Not found'})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'Error querying database.'})
    }
}
async function searchNote(req, res) {
    try {
        const username = res.locals.user.username
        const searchTerm = req.query.title

        if (!searchTerm) {return res.status(400).json({error:'Search term missing.'})}
        
        const result = await pool.query(
            `SELECT id, title, text, "createdAt", "modifiedAt"
            FROM notes 
            WHERE username = $1 AND title ILIKE '%' || $2  || '%'`,
            [username, searchTerm]
        )
        
        res.status(200).json({
            message: 'Search done.',
            count: result.rowCount,
            results: result.rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'Error querying database.'})
    }
}

export {getNotes, newNote, getNote, changeNote, deleteNote, searchNote}
