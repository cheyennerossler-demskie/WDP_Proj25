import { getCurrentUser, removeCurrentUser } from "./user.js";
const nav = document.querySelector('nav')

console.log(getCurrentUser())

if(getCurrentUser()) {
  nav.innerHTML = `
    <ul>
        <li><a href="home.html">Home</a></li>
        <li><button id="logout">Logout</button></li>
        <li><button id="deleteAccount">Delete Account</button></li>
    </ul>
  `
} else {
  nav.innerHTML = `
    <ul>
      <li><a href="home.html">Home</a></li>
      <li><a href="login.html">Log In</a></li>
      <li><a href="register.html">Register</a></li>
    </ul>
  `;
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

// Fetch method implementation:
export async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if (response.ok) {
    // console.log("response ok");
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}
