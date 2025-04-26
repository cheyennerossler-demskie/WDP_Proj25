const express = require("express")
const User = require("../models/user")
const router = express.Router()

// http method for each CRUD function
router.get("/getUsers", (req, res) => {
    try{
        const Users = User.getAllUsers()
        res.send(Users)
    }
    catch(err){
        res.status(401).send({message: err.message})
    }
})

router.post('/login', async (req, res) =>{
    try {
      const User = await User.login(req.body)
      res.send({...User, Password: undefined})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })
  
router.post('/register', async (req, res) => {
try {
    const User = await User.register(req.body)
    res.send({...User, Password: undefined})
} catch(err) {
    res.status(401).send({message: err.message})
}
})

router.put('/update', async (req, res) => {
try {
    const User = await User.updateUsername(req.body)
    res.send({...User, password: undefined})
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