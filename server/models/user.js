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

// USER Example:
const User = [
{
  UserName: "CheyenneRD",
  Email: "chey@gmail.com",
  Password: "cheyspass",
  FirstName: "Cheyenne",
  LastName: "Rossler-Demskie"
},
{
  UserName: "Sabrina",
  Email: "sabrina@gmail.com",
  Password: "witch",
  FirstName: "Sabrina",
  LastName: "Rossler-Demskie"
}
]

// CRUD Operations
async function getAllUsers() {
  let sql = `SELECT * FROM User`
  return await con.query(sql)
}

async function userExists(UserName) {
  let sql = `
    SELECT * FROM User
    WHERE UserName="${UserName}"
  `
  return await con.query(sql)
}

// READ in CRUD: Logging in a user
async function login(User) {
  let cUser = await userExists(User)
  if(!cUser[0]) throw Error("Username does not exist!") 
  if(cUser[0].Password != User.Password) throw Error("Password is incorrect!")
    
  return cUser[0]
}

// CREATE in CRUD - Registering a user
async function register(User) {
  const cUser = await userExists(User.UserName)
  if(cUser.length > 0) throw Error("Username already in use!")

  let sql = `
    INSERT INTO User(UserPasswordEntry, UserName, UserEmail, UserFirstName, UserlastName)
    VALUES("${User.Password}", "${User.UserName}", "${User.Email}", "${User.FirstName}", "${User.LastName}")
  `
  await con.query(sql)
  let newUser = await login(User)
  return await login(User)
}

async function updateUsername(User) {
  let sql = `
    UPDATE User SET
    UserName = "${User.UserName}"
    WHERE UserID = ${User.UserID}
  `
  await con.query(sql)
  const currentUser = await userExists(User.UserName)
  return currentUser[0]
}

//U for Update - Update email of user
async function updateEmail(User) {
  let cEmail = await getEmail(User)
  if(cEmail) throw Error("Email already in use!!")

  let sql = `
    UPDATE User SET Email="${User.Email}"
    WHERE UserName="${User.UserName}"
  `
  await con.query(sql)
  let updatedUser = await userExists(User)
  return updatedUser[0]
}

async function getEmail(user) {
  let sql = `
    SELECT Email FROM User
    WHERE Email="${User.Email}"
  `
  let email = await con.query(sql)
  return email[0]
}

async function deleteAccount(User) {
  let sql = `
    DELETE FROM User
    WHERE UserName = ${User.UserName}
  `
  await con.query(sql)
}

module.exports = { getAllUsers, login, register, updateUsername, updateEmail, deleteAccount }