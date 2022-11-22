const { uuid } = require('uuidv4');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

class db {
    read() {
        return readFile('db/db.json', 'utf-8')
    }

    write(note) {
        return writeFile('db/db.json', JSON.stringify(note))
    }

    getNotes() {
        return this.read()
                .then((notes) => {
                    let noteList;
                    try {
                        noteList = JSON.parse(notes)
                    } catch (error) {
                        noteList = []
                    }
                    return noteList;
                })
    }

    createNote(note) {

        const newNote = {
            title :note.title,
            text: note.text,
            id: uuid()
        }

        return this.getNotes()
            .then((data) => 
                [...data, newNote]
            )
            .then((newData) => 
                this.write(newData)
            )
            .then(() =>
                newNote
            )
    }

    deleteNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter(note => note.id !== id ))
            .then((newNotes) => this.write(newNotes))
    }

}

module.exports = new db();