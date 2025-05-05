const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS Note (
    NoteID INT PRIMARY KEY AUTO_INCREMENT,
    NoteTitle VARCHAR(100) NOT NULL,
    NoteContent TEXT NOT NULL, --  Should be encrypted for security
    NoteCreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    NoteUpdatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UserID INT NOT NULL, -- Every note entry must belong to a user
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);`
  await con.query(sql)  
}
createTable();

// CRUD Operations
async function getAllNotes() {
  let sql = `SELECT * FROM Note WHERE UserID = UserID`
    return await con.query(sql)
}

// READ in CRUD: Searching for a note
async function search(Note) {
  let cNote = await noteExists(Note.NoteID)
  if(!cNote[0]) throw Error("Note does not exist!") 
    
  return cNote[0]
}

async function noteExists(Note) {
  let sql = `
    SELECT * FROM Note
    WHERE NoteTitle="${Note.NoteTitle}"
  `
  return await con.query(sql)
}

// CREATE in CRUD - Saving a note
async function save(Note) {
  const cNote = await noteExists(Note)
  if(cNote.length > 0) throw Error("Title already in use!")

  let sql = `
    INSERT INTO Note(NoteTitle, NoteContent, NoteCreationDate, UserID)
    VALUES("${Note.NoteTitle}", "${Note.NoteContent}", "${Note.NoteCreationDate}", "${Note.UserID}")
  `
  //await con.query(sql)

   await con.query(sql);

   return Note
}

async function updateTitle(Note) {
  let sql = `
    UPDATE Note SET
    NoteTitle = "${Note.NoteTile}"
    WHERE NoteTitle = ${Note.NoteID}
  `
  await con.query(sql)
  const currentNote = await noteExists(Note.NoteTitle)
  return currentNote[0]
}

async function deleteNote(Note) {
  let sql = `
    DELETE FROM Note
    WHERE NoteID = ${Note.NoteID}
  `
  await con.query(sql)
}

/*
// NOTE Example:
const Note = {
  NoteTitle: "April 2025",
  NoteContent: "Test#1"
}
*/

module.exports = { getAllNotes, search, noteExists, save, updateTitle, deleteNote }