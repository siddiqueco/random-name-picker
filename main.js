const input = document.getElementById('input')
const nameList = document.getElementById('name-list')
const display = document.getElementById('display')
const shuffle = document.getElementById('shuffle')
const firstPosition = document.getElementById('first-position')
const secondPosition = document.getElementById('second-position')
const thirdPosition = document.getElementById('third-position')
const reset = document.getElementById('reset')
const inputFile = document.getElementById('input-file')
const checkbox = document.getElementById('checkbox')
const ready = document.getElementById('ready')

let participantNames = []

ready.addEventListener('click', function (event) {
    if (input.value === '') {
        Swal.fire('Oops...', 'Name List is empty!', 'info')
    } else {
        let contestantName = input.value.split(/[\n,]+/).map(arr => arr.trim())
        participantNames = [...contestantName]
        input.value = participantNames.join('\n')

        ready.setAttribute('disabled', false)
        input.setAttribute('disabled', false)
    }
})

shuffle.addEventListener('click', function (event) {

    if (participantNames.length === 0) {
        Swal.fire('Oops...', `You're not ready to shuffle`, 'info')
    } else {
        let suffledNames = shuffleArray(participantNames)

        for (let i = 1; i < suffledNames.length; i++) {
            (function (i, count) {
                setTimeout(() => {
                    let rand = Math.floor(Math.random() * (suffledNames.length))
                    display.innerHTML = suffledNames[rand]

                    if (count === suffledNames.length - 1) {
                        if (!firstPosition.innerHTML) {
                            firstPosition.innerHTML = suffledNames[rand]
                            if (checkbox.checked == true) {
                                let index = participantNames.indexOf(suffledNames[rand])
                                participantNames.splice(index, 1)
                            }
                            console.log(participantNames)
                            winnerAlert(suffledNames[rand])
                        } else if (!secondPosition.innerHTML) {
                            secondPosition.innerHTML = suffledNames[rand]

                            if (checkbox.checked == true) {
                                let index = participantNames.indexOf(suffledNames[rand])
                                participantNames.splice(index, 1)
                            }
                            console.log(participantNames)
                            winnerAlert(suffledNames[rand])
                        } else {
                            thirdPosition.innerHTML = suffledNames[rand]

                            if (checkbox.checked == true) {
                                let index = participantNames.indexOf(suffledNames[rand])
                                participantNames.splice(index, 1)
                            }
                            console.log(participantNames)
                            shuffle.setAttribute("disabled", true);
                            winnerAlert(suffledNames[rand])
                        }
                    }
                }, i)
            })(i * 100, i)
        }
    }
})

inputFile.addEventListener('change', function (event) {
    input.value = ''
    let files = inputFile.files

    if (files.length === 0) return;

    let file = files[0]
    let reader = new FileReader()

    reader.onload = (e) => {
        const file = e.target.result
        const name = file.split(',');
        input.value = name.join(',')
    }
    reader.onerror = (e) => alert(e.target.error.name)
    reader.readAsText(file)
})

reset.addEventListener('click', function (event) {
    input.value = ''
    inputFile.value = ''
    display.innerHTML = 'Display'
    firstPosition.innerHTML = ''
    secondPosition.innerHTML = ''
    thirdPosition.innerHTML = ''
    shuffle.removeAttribute("disabled");
    ready.removeAttribute('disabled')
    input.removeAttribute('disabled')
    checkbox.checked = false
    participantNames.length = 0

})

function shuffleArray(array) {
    let shuffeledArr = [...array]

    for (let i = shuffeledArr.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1))
        let temp = shuffeledArr[rand]
        shuffeledArr[rand] = shuffeledArr[i]
        shuffeledArr[i] = temp
    }
    return shuffeledArr;
}

function winnerAlert(name) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Congratulations',
        text: `'${name}'`,
        showConfirmButton: true,
        timer: 3000
    })
}