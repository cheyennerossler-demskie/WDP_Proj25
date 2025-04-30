import { getCurrentUser, removeCurrentUser } from "./user.js";
import { fetchData } from "./main.js";

const user = getCurrentUser()

if(!user) window.location.href = "index.html"

// Check the user object for correct structure
console.log(user);  

const home = document.getElementById("home")

// Ensure user.firstName exists, use for welcome message
if (user && user.firstName) {
  home.innerHTML = `
    <h3>Welcome, ${user.firstName}!</h3>
    <button id="deleteAccount">Delete Account</button>
  `;
} else {
  // Fallback if firstName is missing
  home.innerHTML = `
    <h3>Welcome, user!</h3>
    <button id="deleteAccount">Delete Account</button>
  `;
}

const deleteUser = document.getElementById("deleteAccount")
deleteUser.addEventListener('click', deleteAccount)

function deleteAccount() {
  if(confirm("Are you sure?")) {
    fetchData('/users/deleteAccount', user, "DELETE")
    .then(data => {
      if(!data.message) {
        console.log(data)
        removeCurrentUser()
        window.location.href = "index.html"
      }
    })
  }
}

/*
let noteForm = document.getElementById('noteForm')
noteForm.addEventListener('submit', save)

function save(e){
    e.preventDefault()
    let errorSection = document.getElementById("error")

    let title = document.getElementById('title').value
    let note = document.getElementById('note').value
    let date = document.getElementById('date').value

    if(validString(title)) {
        errorSection.innerText = `Title cannot be blank!!!`
    } 
    else {
        errorSection.innerText = ""  
        console.log(title)
    }

    const notes = {
        title: note,
        note: note,
        date: date
    }

    let section = document.getElementById("saved")
    section.innerHTML = `Saved note: ${title}`

    console.log(notes)
}

document.getElementById('title').value = ""
document.getElementById('note').value = ""
document.getElementById('date').value = ""

function validString(word) {
    return word == ""
}
*/