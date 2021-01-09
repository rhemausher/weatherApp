//const fetch = require('node-fetch')

console.log('Client-side javascript file is loaded!')

// fetch this URL then call the response function
fetch('http://puzzle.mead.io/puzzle').then((response) => {
   response.json().then((data) => {
       console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const element = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageTwo.textContent =''

weatherForm.addEventListener ('submit', (e) => {
    // ordinarilly, the browser would clear the screen at this point.
    // preventDefault() will disable this behavior
    e.preventDefault()
    const location = 'http://localhost:3000/weather?address=' + element.value

    messageOne.textContent ='Loading ...'
    messageTwo.textContent = ''

    // fetch this URL then call the response function
    fetch(location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            }else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
    console.log(location)
})