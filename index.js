let input = []
const inputBtn = document.getElementById('input-btn')
const inputEl = document.getElementById('input-el')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')
let leadsFromLocalStorage = JSON.parse(localStorage.getItem('input'))

if (leadsFromLocalStorage) {
    input = leadsFromLocalStorage
    append(input)
}

function append(leads) {
    let listItems = ''
    for (let i = 0; i < input.length; i++) {
        listItems += `
        <li>
          <a target="_blank" href="${leads[i]}">
          ${leads[i]}
       </a>
       </li>
      `
    }
    ulEl.innerHTML = listItems
}

tabBtn.addEventListener('click', function() {

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
        input.push(tabs[0].url)
        localStorage.setItem('input', JSON.stringify(input))
        append(input)
    })


})

inputBtn.addEventListener('click', function() {
    input.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem('input', JSON.stringify(input))
    append(input)
})

deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear()
    input = []
    append(input)
})