let loginForm = document.getElementById("loginForm")

loginForm.addEventListener('submit', log)

function login(e){
    e.preventDefault()

    let username = document.getElementById('uname').value
    let password = document.getElementById('pw').value

    console.log(uname)
    console.log(pw)

    const user = {
        userName: uname,
        password: pw
    }

    document.getElementById('uname').value = ""
    document.getElementById('pw').value = ""

    console.log(uname)
    console.log(pw)
}

