import { getCurrentUser, setCurrentUser, removeCurrentUser } from "./user.js";
import { fetchData } from "./main.js";

const user = getCurrentUser()

if(!user) window.location.href = "index.html"

const account = document.getElementById("account")

if (user?.UserName) {
  document.getElementById("notePrompt").innerText = `${user.UserFirstName}'s Notes`;
}

if (user?.UserName) {
  document.getElementById("passwordPrompt").innerText = `${user.UserFirstName}'s Passwords (coming SOON!)`;
}

if (user?.UserName) {
  document.getElementById("prompt").innerText = `Update Username`;
}

/*account.innerHTML += `
   <p class="prompt">Update Username<p>
`
*/

  document.getElementById("loadNotes").addEventListener("click", loadNotes);

  function loadNotes() {
    fetch(`/note/getAllNotes?UserID=${user.UserID}`)
      .then(response => response.json())
      .then(notes => {
        const notesContainer = document.getElementById('notesContainer');
        notesContainer.innerHTML = ""; // clear old notes
        if (notes && notes.length > 0) {
          notes.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.innerHTML = `
              <h4>${note.NoteTitle}</h4>
              <p>${note.NoteContent}</p>
              <p><small>Created on: ${new Date(note.NoteCreationDate).toLocaleString()}</small></p>
            `;
            notesContainer.appendChild(noteDiv);
          });
        } else {
          notesContainer.innerHTML = '<p>No notes found.</p>';
        }
      })
      .catch(err => {
        console.error('Error fetching notes:', err);
        document.getElementById('notesContainer').innerText = 'Failed to load notes.';
      });
  }

let updateUsernameForm = document.getElementById('updateUsernameForm')
if(updateUsernameForm) updateUsernameForm.addEventListener('submit', editUsername)

function editUsername(e){
  e.preventDefault()

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  // Add PlainPassword for backend comparison
  const updatedUser = {
    ...getCurrentUser(),
    UserName: username,
    PlainPassword: password
  }

  fetchData('/users/update', updatedUser, "PUT")
  .then(data => {
    setCurrentUser(data.user)
    updateUsernameForm.reset()  
    document.getElementById("error").innerText = ""

    document.getElementById("statusMessage").innerHTML = '<p>Username Updated Successfully!</p>';
  })
  .catch(err => {
    const errorSection = document.getElementById("error")
    if (errorSection) {
      errorSection.innerText = `${err.message}`
    } else {
      alert(err.message)
    }
    document.getElementById("statusMessage").innerHTML = '';
  })
}

const deleteButton = document.getElementById("deleteAccount")

if (deleteButton) deleteButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    const user = getCurrentUser()
    fetchData('/users/deleteAccount', user, "DELETE")
      .then(data => {
        if (data.message) {
          console.log(data)
          alert(data.message)
          removeCurrentUser()
          window.location.href = "index.html"
        }
      })
      .catch(err => console.error("Delete failed:", err))
  }
})
