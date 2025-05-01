import { getCurrentUser, removeCurrentUser } from "./user.js";
import { fetchData } from "./main.js";

const user = getCurrentUser()

if(!user) window.location.href = "index.html"

// Check the user object for correct structure
console.log(user);  

const home = document.getElementById("home")

if (user && user.UserFirstName) {
  home.innerHTML = `
    <h3>Welcome, ${user.UserFirstName}!</h3>
  `
} else {
  home.innerHTML = `
    <h3>Welcome, user!</h3>
  `
}

let noteForm = document.getElementById('noteForm')
noteForm.addEventListener('submit', save)

function save(e){
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

function getNotes(){
  fetchData("/users/getAllNotes")
    .then(notes => {
      let ul = document.getElementById("noteList");
      ul.innerHTML = "";
      notes.forEach(note => {
        let li = document.createElement("li");
        li.innerHTML = `
          <h3>${note.NoteTitle}</h3>
          <p>${note.NoteContent}</p>
        `;
        ul.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Error fetching notes:", err.message);
    });
}

getNotes();

/*
document.getElementById('title').value = ""
document.getElementById('note').value = ""
document.getElementById('date').value = ""

function validString(word) {
    return word == ""
}
    */