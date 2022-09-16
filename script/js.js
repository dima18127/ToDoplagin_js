let message = document.querySelector('.message')
let button = document.querySelector('.add')
let todo = document.querySelector('.todo')

let tasks = [];

if (localStorage.getItem("todo" )) {
    tasks = JSON.parse(localStorage.getItem("todo" ));
displayMessages();
}

button.addEventListener("click", () => {if (message.value.length >= 1) {addTask()} else {console.log("Введите задачу");}});

function addTask() {
         let newToDo = {
             text: message.value,
             checked: false,
             important: false
            }
            tasks.push(newToDo)
            console.log(message.value);
            displayMessages()
            localStorage.setItem("todo", JSON.stringify( tasks))
        } 


function displayMessages(params) {

    let newContent = " ";
    tasks.forEach( function (item, i) {
            newContent += `
                        <li>
                            <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : " "}>
                            <label for='item_${i}' class="${item.important ? "important" : " "}">${item.text}</label>
                        </li> 
                    `
                    todo.innerHTML = newContent
    message.value = ""
    })
    
    todo.addEventListener("change", function (e)  {
        let valueLabel = todo.querySelector('[for='+ e.target.getAttribute('id') +']').innerHTML;
        
        tasks.forEach( function (item) {

            if (item.text === valueLabel ) {
                item.checked = !item.checked;
                localStorage.setItem("todo", JSON.stringify( tasks))
            }
        }) 
    })
}
todo.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    tasks.forEach(function (item, index) {
        if (e.target.getAttribute('for') === `item_${index}` ) {
            item.important = !item.important
            localStorage.setItem("todo", JSON.stringify( tasks))
            displayMessages()
            }       
        })
     
})