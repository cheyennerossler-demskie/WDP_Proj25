import { getCurrentUser, removeCurrentUser } from "./user.js";
const nav = document.querySelector('nav')

console.log(getCurrentUser())

if(getCurrentUser()) {
  nav.innerHTML = `
    <ul>
        <li><a href="home.html">Home</a></li>
         <li><a href="account.html">Account</a></li>
        <li><button id="logout">Logout</button></li>
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
