const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS PasswordEntry (
    PasswordEntryID INT PRIMARY KEY AUTO_INCREMENT,
    PasswordEntryName VARCHAR(100) NOT NULL,
    PasswordEntryUserName VARCHAR(100) NOT NULL,
    PasswordEntryPassword VARCHAR(255) NOT NULL, -- Should be encrypted before storing
    PasswordEntryCreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    PasswordEntryUpdatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UserID INT NOT NULL, --  Every password entry must belong to a user
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);`
  await con.query(sql)  
}
createTable();

// CRUD Operations
async function getPasswords() {
  let sql = `SELECT * FROM PasswordEntry`
  return await con.query(sql)
}

// READ in CRUD: Searching for a password
async function search(PasswordEntry) {
  let cPasswordEntry = await noteExists(PasswordEntry.PasswordEntryID)
  if(!cPasswordEntry[0]) throw Error("Password does not exist!") 
    
  return cPasswordEntry[0]
}

// CREATE in CRUD - Saving a password
async function save(PasswordEntry) {
  const cNote = await noteExists(PasswordEntry.PasswordEntryName)
  if(cNote.length > 0) throw Error("Password already in use!")

  let sql = `
    INSERT INTO PasswordEntry(PasswordEntryName, PasswordEntryUserName, PasswordEntryPassword, PasswordEntryCreationDate, PasswordEntryUpdatedDate)
    VALUES("${PasswordEntry.PasswordEntryName}", "${PasswordEntry.PasswordEntryUserName}", "${PasswordEntry.PasswordEntryPassword}", "${PasswordEntry.NoteCreationDate}", "${PasswordEntry.NoteUpdatedDate}")
  `
  await con.query(sql)

  return await login(PasswordEntryUserName)
}

async function editPassword(PasswordEntryUserName) {
  let sql = `
    UPDATE PasswordEntry SET
    PasswordEntryPassword = "${PasswordEntry.PasswordEntryPassword}"
    WHERE PasswordEntryPassword = ${PasswordEntry.PasswordEntryID}
  `
  await con.query(sql)
  const currentPassword = await passwordExists(PasswordEntry.PasswordEntryName)
  return currentPasswordEntry[0]
}

// NOTE Example:
const PasswordEntry = {
  PasswordEntryName: "April 2025",
  PasswordEntryUserName: "CheyenneRD",
  PasswordEntryPassword: "cheyspass"
}
async function deletePassword(PasswordEntry) {
  let sql = `
    DELETE FROM deletePassword
    WHERE PasswordEntryID = ${PasswordEntry.PasswordEntryID}
  `
  await con.query(sql)
}

module.exports = { getPasswords, search, save, editPassword, deletePassword }