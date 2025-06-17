import pool from "../utils/db.js"

async function getNotes(req, res) {
    //Extra: Kolla om param för spcifik note id
    console.log(req.params, req.query)

    //Hämta alla notes
    const result = await pool.query(
        'SELECT * FROM notes WHERE username = $1',
        [res.locals.user.username]
    )

    res.send({notes: result.rows})

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

export {getNotes, newNote, changeNote, deleteNote, searchNote}