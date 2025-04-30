const express = require("express")
const User = require("../models/user")
const router = express.Router()

// http method for each CRUD function
router
.get("/getUsers", async (req, res) => {
    try{
        const users = await User.getAllUsers()
        console.log("users: " + users)
        res.send(users)
    }
    catch(err){
        res.status(500).send({message: err.message})
    }
})

.post('/login', async (req, res) =>{
    try {
      console.log("Login route hit");
      const user = await User.login(req.body)
      //res.send({...user, password: undefined})
      res.send(user)
    } catch(err) {
      res.status(401).send({message: err.message})
    }
})
  
.post('/register', async (req, res) => {
    try {
        const user = await User.register(req.body)
        //res.send({...user, password: undefined})
        res.send(user)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

.put('/update', async (req, res) => {
    try {
        const user = await User.updateUsername(req.body)
        //res.send({...user, password: undefined})
        res.send(user)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

.delete('/deleteAccount', async (req, res) => {
    try {
      await User.deleteAccount(req.body)
      res.send({success: "Account Delete Successful"})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
})

module.exports = router