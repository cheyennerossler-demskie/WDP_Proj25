const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS User (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    UserName VARCHAR(50) NOT NULL UNIQUE,
    UserPasswordHash VARCHAR(255) NOT NULL,
    UserFirstName VARCHAR(100) NOT NULL,
    UserLastName VARCHAR(100) NOT NULL,
    UserEmail VARCHAR(100) NOT NULL UNIQUE,
    UserPhoneNumber VARCHAR(25) UNIQUE,
    UserCreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
  await con.query(sql)  
}
createTable();

// CRUD Operations
async function getAllUsers() {
  let sql = `SELECT * FROM User`
  return await con.query(sql)
}

// READ in CRUD: Logging in a user
async function login(User) {
  let cUser = await userExists(User.Username)
  if(!cUser[0]) throw Error("Username does not exist!") 
  if(cUser[0].password != user.Password) throw Error("Password is incorrect!")
    
  return cUser[0]
}

async function userExists(username) {
  let sql = `
    SELECT * FROM User
    WHERE UserName="${username}"
  `
  return await con.query(sql)
}

// CREATE in CRUD - Registering a user
async function register(User) {
  const cUser = await userExists(user.Username)
  if(cUser.length > 0) throw Error("Username already in use!")

  let sql = `
    INSERT INTO User(UserPasswordEntry, UserName, UserEmail, UserFirstName, UserlastName)
    VALUES("${User.Password}", "${User.Username}", "${User.Email}", "${User.FirstName}", "${User.LastName}")
  `
  await con.query(sql)

  return await login(User)
}

async function editUsername(User) {
  let sql = `
    UPDATE User SET
    UserName = "${User.UserName}"
    WHERE UserID = ${User.UserID}
  `
  await con.query(sql)
  const currentUser = await userExists(User.Username)
  return currentUser[0]
}

// USER Example:
const user = {
  Username: "CheyenneRD",
  Email: "chey@gmail.com",
  Password: "cheyspass",
  FirstName: "Cheyenne",
  LastName: "Rossler-Demskie"
}
async function deleteAccount(user) {
  let sql = `
    DELETE FROM User
    WHERE UserID = ${User.userID}
  `
  await con.query(sql)
}

module.exports = { getAllUsers, login, register, editUsername, deleteAccount }