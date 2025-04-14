let regForm = document.getElementById('regForm')
regForm.addEventListener('submit', register)

function register(e){
    e.preventDefault()
    let errorSection = document.getElementById("error")

    let firstname = document.getElementById('firstname').value
    let lastname = document.getElementById('lastname').value
    let email = document.getElementById('email').value
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    if(validString(username)) {
        errorSection.innerText = `Username cannot be blank!!!`
    } 
    else {
        errorSection.innerText = ""  
        console.log(username)
    }

    const user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password
    }

    let section = document.getElementById("welcome")
    section.innerHTML = `Welcome, ${username}!`

    console.log(user)
}

document.getElementById('firstname').value = ""
document.getElementById('lastname').value = ""
document.getElementById('email').value = ""
document.getElementById('username').value = ""
document.getElementById('password').value = ""

function validString(word) {
    return word == ""
}