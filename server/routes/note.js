const express = require("express")
const User = require("../models/note")
const router = express.Router()

// http method for each CRUD function
router.get("/getAllNotes", (req, res) => {
    try{
        const Notes = Note.getAllNotes()
        res.send(Notes)
    }
    catch(err){
        res.status(401).send({message: error.message})
    }
})

router.post('/search', async (req, res) =>{
    try {
      const Note = await Note.search(req.body)
      res.send({...Note, NoteTitle: undefined})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })
  
router.post('/save', async (req, res) => {
try {
    const Note = await Note.save(req.body)
    res.send({...Note, NoteTitle: undefined})
} catch(err) {
    res.status(401).send({message: err.message})
}
})

router.put('/editTitle', async (req, res) => {
try {
    const Note = await Note.editNoteTitle(req.body)
    res.send({...NoteTitle, NoteID: undefined})
} catch(err) {
    res.status(401).send({message: err.message})
}
})

router.delete('/deletenote', async (req, res) => {
try {
    await User.deleteNote(req.body)
    res.send({success: "Fine, be that way. Bye!"})
} catch(err) {
    res.status(401).send({message: err.message})
}
})

module.exports = router