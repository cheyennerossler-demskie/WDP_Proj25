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
  
  const title = document.getElementById('title').value.trim();
  const noteContent = document.getElementById('note').value.trim();
  const date = document.getElementById('date').value;
  const user = getCurrentUser(); 

  const errorEl = document.getElementById('error');
  const statusEl = document.getElementById('statusMessage');
  
  errorEl.innerText = '';
  statusEl.innerHTML = '';

  // Validation check: Title, content, and date are required
  if (!title || !noteContent || !date) {
    errorEl.innerText = 'Please fill in Title, Note, and Date before saving.';
    return;
  }

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
    if (data.error || (data.message && data.message.includes("Title already in use"))) {
      errorEl.innerText = data.message || data.error;
      statusEl.innerHTML = '';
    } else {
      statusEl.innerHTML = '<p>Note Saved Successfully!</p>';
      errorEl.innerText = ''; // Clear any error message
      document.getElementById('noteForm').reset(); // Reset the form fields
    }
  })
  .catch(err => {
    errorEl.innerText = 'Failed to save note.';
    statusEl.innerHTML = '';
    console.error('Error:', err);
  });
}
