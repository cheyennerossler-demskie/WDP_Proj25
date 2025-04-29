const express = require("express")
const User = require("../models/user")
const router = express.Router()

// http method for each CRUD function
router
.get("/getUsers", (req, res) => {
    try{
        const users = User.getAllUsers()
        res.send(users)
    }
    catch(err){
        res.status(401).send({message: err.message})
    }
})

.post('/login', async (req, res) =>{
    try {
      const user = await User.login(req.body)
      res.send({...user, password: undefined})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
})
  
.post('/register', async (req, res) => {
    try {
        const user = await User.register(req.body)
        res.send({...user, password: undefined})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

.put('/update', async (req, res) => {
    try {
        const user = await User.updateUsername(req.body)
        res.send({...user, password: undefined})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

router.delete('/deleteAccount', async (req, res) => {
    try {
        await User.deleteAccount(req.body)
        res.send({success: "Fine, be that way. Bye!"})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

// "http://localhost:3000/users/getUsers"
// export router
module.exports = router