import pool from "../utils/db.js"

async function getNote(req, res) {
    const result = await pool.query(`SELECT * FROM notes WHERE userid = $1 AND id = $2`, [res.locals.user.username, req.params.id])

    res.status(200).json({message: 'ok', note: result[0]})
}
async function getNotes(req, res) {
    const result = await pool.wuery('select * from notes where userid = $1', [res.locals.user.username])

    res.send({notes: result})

}
function newNote(req, res) {
    const user = res.locals.user.username
    const note = req.body

    pool.query('INSERT INTO notes')

    res.status(201).json({message:'Note created'})
}
function changeNote(req, res) {
    // user
    // note
    // sql UPDATE
    res.status(200).json({message: 'Note changed'})

    // byt inte id eller createdAt
    // uppdatera modifiedAt
}
function deleteNote(req, res) {
    // user
    const {noteId} = req.body
    pool.query('DROP FROM notes WHERE id =$1 and userid = $2',[])
}
function searchNote(req, res) {
    const user = res.locals.user.username
    const query = req.body.params.query['q']

    // select psql search from title in notes

    res.status(200).json({})
}

export {getNote, getNotes, newNote, changeNote, deleteNote, searchNote}