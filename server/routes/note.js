const express = require("express")
const Note = require("../models/note")
const router = express.Router()

// http method for each CRUD function
router
.get("/getAllNotes", async (req, res) => {
    try{
        const { UserID } = req.query
        const Notes = await Note.getAllNotes(UserID)
        res.send(Notes)
    }
    catch(err){
        res.status(401).send({message: err.message})
    }
})

.post('/note', async (req, res) => {
    try {
      const savedNote = await Note.save(req.body);
      res.status(201).send({
        message: "Note saved successfully!",
        data: savedNote
      });
    } catch (err) {
      res.status(400).send({
        message: err.message || "Error saving note"
      });
    }
  })

.get('/search', async (req, res) =>{
    try {
      const Note = await Note.search(req.body)
      res.send(foundNote);
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })
 

.post('/save', async (req, res) => {
try {
    const note = await Note.save(req.body)
    res.send(note)
} catch(err) {
    res.status(401).send({message: err.message})
}
})

.post('/editTitle', async (req, res) => {
try {
    const note = await Note.editNoteTitle(req.body)
    res.send(updatedNote)
} catch(err) {
    res.status(401).send({message: err.message})
}
})

.delete('/deletenote', async (req, res) => {
try {
    await Note.deleteNote(req.body)
    res.send({success: "Note Delete Successful"})
} catch(err) {
    res.status(401).send({message: err.message})
}
})

module.exports = router