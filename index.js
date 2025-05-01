// entry point, see package.json
// specify we want to use express
const express = require('express')
const app = express()
const path = require("path")

app.use(express.json())

// all entries
const userRoutes = require("./server/routes/user")
const noteRoutes = require("./server/routes/note")
// const passwordentryRoutes = require("./server/routes/passwordentry")


//CORS middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
    next();
  });

app.use(express.static(__dirname + "/public"))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))
  
// all entities
app.use("/users", userRoutes)
app.use("/note", noteRoutes)
//app.use("/passwordentry", passwordentryRoutes)

const PORT = process.env.PORT || 3000 // mySQL benchmark - computer not using
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`))