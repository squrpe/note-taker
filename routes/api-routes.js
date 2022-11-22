const db = require('../db/db');
const router = require('express').Router();

router.get('/notes', (req,res) => {
    // res.json('test')
    // db.createNote(req.body);

    db.getNotes()
        .then((notes) => {
        return res.json(notes)
        })

})

router.post('/notes', (req,res) => {
    // res.json('test')
    db.createNote(req.body)
        .then((note) => {
            return res.json(note)
        })

})

router.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id)
})

module.exports = router;