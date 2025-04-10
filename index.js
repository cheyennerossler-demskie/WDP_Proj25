// entry point, see package.json
// specify we want to use express
const express = require('express')
const app = express()

//const userRoutes = require("./server/routes/user")
// do same for all entities

//app.use("/users", userRoutes)
// do same for all entities

const PORT = process.env.PORT || 3000; // mySQL benchmark - computer not using
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));