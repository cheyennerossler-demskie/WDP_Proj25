import { getCurrentUser, setCurrentUser, removeCurrentUser } from "./user.js";
import { fetchData } from "./main.js";

const user = getCurrentUser()

if(!user) window.location.href = "index.html"

const account = document.getElementById("account")

account.innerHTML = `
   <p class="prompt">Update Username<p>
`

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

const deleteButton = document.getElementById("deleteAccount")
if (deleteButton) deleteButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    const user = getCurrentUser()
    fetchData('/users/deleteAccount', user, "DELETE")
      .then(data => {
        if (!data.message) {
          console.log(data)
          removeCurrentUser()
          window.location.href = "index.html"
        }
      })
      .catch(err => console.error("Delete failed:", err))
  }
})
