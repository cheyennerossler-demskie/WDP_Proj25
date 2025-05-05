import { getCurrentUser, setCurrentUser, removeCurrentUser } from "./user.js";
import { fetchData } from "./main.js";

const user = getCurrentUser()

if(!user) window.location.href = "index.html"

const account = document.getElementById("account")

if (user?.UserName) {
  document.getElementById("notePrompt").innerText = `${user.UserFirstName}'s Notes`;
}

if (user?.UserName) {
  document.getElementById("passwordPrompt").innerText = `${user.UserFirstsName}'s Passwords`;
}

account.innerHTML += `
   <p class="prompt">Update Username<p>
`

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

    alert(data.message)
  })
  .catch(err => {
    const errorSection = document.getElementById("error")
    if (errorSection) {
      errorSection.innerText = `${err.message}`
    } else {
      alert(err.message)
    }
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
