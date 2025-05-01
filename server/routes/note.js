const express = require("express")
const Note = require("../models/note")
const router = express.Router()

// http method for each CRUD function
router
.get("/getAllNotes", (req, res) => {
    try{
        const { UserID } = req.query
        const Notes = Note.getAllNotes(req.query.UserID)
        res.send(Notes)
    }
    catch(err){
        res.status(401).send({message: error.message})
    }
})

.get('/search', async (req, res) =>{
    try {
      const Note = await Note.search(req.body)
      //res.send({...Note, NoteTitle: undefined})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })
  
.post('/save', async (req, res) => {
try {
    const Note = await Note.save(req.body)
    res.send({...Note, NoteTitle: undefined})
} catch(err) {
    res.status(401).send({message: err.message})
}
})

.post('/editTitle', async (req, res) => {
try {
    const Note = await Note.editNoteTitle(req.body)
    res.send({...NoteTitle, NoteID: undefined})
} catch(err) {
    res.status(401).send({message: err.message})
}
})

.delete('/deletenote', async (req, res) => {
try {
    await User.deleteNote(req.body)
    res.send({success: "Note Delete Successful"})
} catch(err) {
    res.status(401).send({message: err.message})
}
})

module.exports = router