import { getCurrentUser, removeCurrentUser } from "./user.js";
const nav = document.querySelector('nav')

if(getCurrentUser()) {
  nav.innerHTML = `
    <ul>
        <li><a href="home.html">Home</a></li>
        <li><a id="logout">Logout</a></li>
    </ul>
  `
} else {
  nav.innerHTML = `
    <ul>
        <li><a href="home.html">Home</a></li>
        <li><a href="login.html">Log In</a></li>
        <li><a href="register.html">Register</a></li>
    </ul>
  `
}

// enable logout functionality
const logout = document.getElementById("logout")
if(logout) logout.addEventListener('click', removeCurrentUser)

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