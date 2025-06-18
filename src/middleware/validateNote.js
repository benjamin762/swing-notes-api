function validateNote(req, res) {
    const {title, text} = req.body

    if (title.length > 50) {return res.status(400).json({error:'Title too long.'})}

    if (text.length > 300) {return res.status(400).json({error: 'Text too long.'})}

    next()
}

export {validateNote}