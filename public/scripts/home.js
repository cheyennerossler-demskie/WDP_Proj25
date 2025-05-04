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

let noteForm = document.getElementById('noteForm')
noteForm.addEventListener('submit', saveNote)

function saveNote(e){
   e.preventDefault() 
   
     let errorSection = document.getElementById("error")
   
     const note = {
       NoteTitle: document.getElementById("title").value,
       NoteContent: document.getElementById("note").value,
       UserID: user.UserID
     }

      fetchData("/users/save", note, "POST")
       .then(data => {
         if(!data.message) {
           //etCurrentUser(data)
           window.location.href = "home.html"
         }
       })
       .catch(err => {
         errorSection.innerText = `${err.message}`
       })
}

let updateUserForm = document.getElementById('updateUserForm')
if(updateUserForm) updateUserForm.addEventListener('submit', editUsername)

function editUsername(e){
  e.preventDefault()

  user.username = document.getElementById("username").value

  fetchData('/users/update', user, "PUT")
  .then(data => {
    removeCurrentUser()
    setCurrentUser(data)
  })
  .catch(err => {
    errorSection.innerText = `${err.message}`
  })
}

const logoutButton = document.getElementById('logout');
if (logoutButton) {
  logoutButton.addEventListener('click', function (e) {
    // Show confirmation dialog
    const confirmed = confirm("Are you sure you want to log out?");
    
    // If the user cancels the logout, prevent the default action
    if (!confirmed) {
      e.preventDefault(); // Prevent the default logout action
    } else {
      // If the user confirms, the logout action continues (this could be redirect, remove session, etc.)
      removeCurrentUser();  // Calls your logout function
      window.location.href = "index.html"; // Redirects to the login page or home
    }
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

