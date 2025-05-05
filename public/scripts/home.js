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

let passwordForm = document.getElementById('passwordForm')
.addEventListener('submit', savePassword)

function savePassword(e){
   e.preventDefault() 
   
     let errorSection = document.getElementById("error")
   
     const password = {
       PasswordTitle: document.getElementById("title").value,
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



/*
document.getElementById('title').value = ""
document.getElementById('note').value = ""
document.getElementById('date').value = ""

function validString(word) {
    return word == ""
}
    */

