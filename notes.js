const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (duplicateNote === undefined) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    } else {
        console.log(chalk.red.inverse("This note aready existed!"))
    }
}

const readNote = (title) => {
    const notes = loadNotes()

    const note = notes.find(note => note.title === title)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse("Error: note not found"))
    }
}

const updateNote = (title, body) => {
    const notes = loadNotes()

    // update: consist of remove, read, add functionality
    const remainNotes = notes.filter(note => note.title !== title)
    if (remainNotes.length !== notes.length) {
        console.log('before update')
        readNote(title)
        // store current removed state
        saveNotes(remainNotes)
        // add updated note
        remainNotes.push({
            title: title,
            body: body
        })
        saveNotes(remainNotes)
        console.log(chalk.green.inverse("Note updated!"))
        console.log('after update')
        readNote(title)
    } else {
        console.log(chalk.red.inverse("No note found!"))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const remainNotes = notes.filter(note => note.title !== title)
    if (remainNotes.length !== notes.length) {
        saveNotes(remainNotes)
        console.log(chalk.green.inverse("Note removed!"))
    } else {
        console.log(chalk.red.inverse("No note found!"))
    }
}

const listNote = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse("Your notes"))
    notes.forEach((note) => {
        console.log('title: ' + note.title, 'body: ' + note.body)
    })
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    readNode: readNote,
    updateNote: updateNote,
    removeNote: removeNote,
    listNode: listNote
}