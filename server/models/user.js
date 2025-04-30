const con = require("./db_connect")

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

  const passwordMatch = await bcrypt.compare(user.UserPasswordHash, cUser[0].UserPasswordHash);
  if (!passwordMatch) throw Error("Password is incorrect!");

  // Don't return the password hash
  const { UserPasswordHash, ...userWithoutPassword } = cUser[0];
  return userWithoutPassword;
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

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(user.UserPasswordHash, saltRounds);

  let sql = `
    INSERT INTO User(UserFirstName, UserLastName, UserPhoneNumber, UserEmail, UserName, UserPasswordHash)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  //await con.query(sql)

  await con.query(sql, [
    user.UserFirstName,
    user.UserLastName,
    user.UserPhoneNumber,
    user.UserEmail,
    user.UserName,
    hashedPassword
  ]);

  //return await login(user)

  // Retrieve the newly created user and return without password
  const newUser = await userExists(user.UserName);
  const { UserPasswordHash, ...userWithoutPassword } = newUser[0];
  return userWithoutPassword;
}

async function updateUsername(user) {
  let sql = `
    UPDATE User SET
    UserName = "${user.UserName}"
    WHERE UserID = ${user.UserID}
  `
  await con.query(sql)
  const currentUser = await userExists(user.username)
  return currentUser[0]
}

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

async function deleteAccount(user) {
  let sql = `
    DELETE FROM User
    WHERE UserID = ${user.UserID}
  `
  await con.query(sql)
}

// USER Example:
/*
const user2 = {
    UserName: "C",
    Email: "c@gmail.com",
    UserPasswordHash: "cspass",
    UserFirstName: "C",
    UserLastName: "R"
 }
*/

module.exports = { getAllUsers, login, register, updateUsername, updateEmail, deleteAccount }