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

createTable()

// CRUD Operations
async function getAllUsers() {
  let sql = `SELECT * FROM User`
  return await con.query(sql)
}

// READ in CRUD: Logging in a user
async function login(user) {
  let cUser = await userExists(user.UserName)
  if(!cUser[0]) throw Error("Username does not exist!") 
  if(cUser[0].password != user.UserPasswordHash) throw Error("Password is incorrect!")
    
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
async function register(user) {
  const cUser = await userExists(user.UserName)
  if(cUser.length > 0) throw Error("Username already in use!")

  let sql = `
    INSERT INTO User(UserPasswordEntry, UserName, UserEmail, UserFirstName, UserlastName)
    VALUES("${user.UserPasswordHash}", "${user.UserName}", "${user.Email}", "${user.UserFirstName}", "${user.UserLastName}")
  `
  await con.query(sql)

  return await login(user)
}

async function updateUsername(user) {
  let sql = `
    UPDATE User SET
    username = "${user.username}"
    WHERE UserID = ${user.UserID}
  `
  await con.query(sql)
  const currentUser = await userExists(user.username)
  return currentUser[0]
}

/*
//U for Update - Update email of user
async function updateEmail(user) {
  let cEmail = await getEmail(user)
  if(cEmail) throw Error("Email already in use!!")

  let sql = `
    UPDATE User SET Email="${user.Email}"
    WHERE UserName="${user.UserName}"
  `
  await con.query(sql)
  let updatedUser = await userExists(user)
  return updatedUser[0]
}

async function getEmail(user) {
  let sql = `
    SELECT Email FROM User
    WHERE Email="${user.Email}"
  `
  let email = await con.query(sql)
  return email[0]
}
*/

// USER Example:
const user = {
    UserName: "CheyenneRD",
    Email: "chey@gmail.com",
    UserPasswordHash: "cheyspass",
    UserFirstName: "Cheyenne",
    UserLastName: "Rossler-Demskie"
 }

async function deleteAccount(user) {
  let sql = `
    DELETE FROM User
    WHERE UserID = ${user.UserID}
  `
  await con.query(sql)
}

module.exports = { getAllUsers, login, register, updateUsername, deleteAccount }