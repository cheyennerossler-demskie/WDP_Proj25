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