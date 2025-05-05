import { getCurrentUser, setCurrentUser, removeCurrentUser } from "./user.js";
import { fetchData } from "./main.js";

const user = getCurrentUser()

if(!user) window.location.href = "index.html"

// Check the user object for correct structure
console.log(user);  

const home = document.getElementById("home")

/*home.innerHTML = `
   <h1>Welcome ${user.username}!</h1>
   <button id="deleteAccount">Delete Account</button>
`
*/

if (user && user.UserFirstName) {
  home.innerHTML += `
    <h3>Welcome, ${user.UserFirstName}!</h3>
  `
} else {
  home.innerHTML += `
    <h3>Welcome, user!</h3>
  `
}

document.getElementById('noteForm').addEventListener('submit', saveNote);

function saveNote(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const noteContent = document.getElementById('note').value;
  const date = document.getElementById('date').value;
  const user = getCurrentUser(); 

  const note = {
    NoteTitle: title,
    NoteContent: noteContent,
    NoteCreationDate: date, 
    UserID: user.UserID
  };

  // Send the note to the server
  fetch('/note/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      document.getElementById('error').innerText = data.error;
      document.getElementById('statusMessage').innerHTML = ''; // Clear previous messages
    } else {
      document.getElementById('saved').innerText = 'Note Saved Successfully';
      // Reset form fields
      document.getElementById('noteForm').reset();
    }
  })
  .catch(err => {
    document.getElementById('error').innerText = 'Failed to save note';
    console.error('Error:', err);
  });
}

/*
document.getElementById('title').value = ""
document.getElementById('note').value = ""
document.getElementById('date').value = ""

function validString(word) {
    return word == ""
}
    */

