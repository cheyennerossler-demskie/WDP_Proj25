const express = require("express")
const USER = require("../models/user")
const router = express.Router()

// http method for each CRUD function
router.get("/getUsers", (req, res) => {
    try{
        const users = User.getAllUsers()
        res.send(users)
    }
    catch(err){
        res.status(401).send({message: error.message})
    }
});

// "http://localhost:3000/users/getUsers"
// export router
module.exports = router