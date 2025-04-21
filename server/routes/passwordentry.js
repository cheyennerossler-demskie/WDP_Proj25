const express = require("express")
const User = require("../models/user")
const router = express.Router()

// http method for each CRUD function
router.get("/getAllPasswords", (req, res) => {
    try{
        const PasswordEntry = User.getAllPasswords()
        res.send(PasswordEntrys)
    }
    catch(err){
        res.status(401).send({message: error.message})
    }
})

router.post('/search', async (req, res) =>{
    try {
      const user = await PasswordEntry.search(req.body)
      res.send({...user, password: undefined})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })
  
router.post('/save', async (req, res) => {
try {
    const PasswordEntry = await PasswordEntry.save(req.body)
    res.send({...PasswordEntryName, PasswordEntryUserName: undefined})
} catch(err) {
    res.status(401).send({message: err.message})
}
})

router.put('/editPassword', async (req, res) => {
try {
    const PasswordEntry = await User.editPassword(req.body)
    res.send({...PasswordEntryPassword, PasswordEntryID: undefined})
} catch(err) {
    res.status(401).send({message: err.message})
}
})

router.delete('/deletePassword', async (req, res) => {
try {
    await PasswordEntry.deletePassword(req.body)
    res.send({success: "Fine, be that way. Bye!"})
} catch(err) {
    res.status(401).send({message: err.message})
}
})

module.exports = router