let message = document.querySelector('.message')
let button = document.querySelector('.add')
let todo = document.querySelector('.todo')

let tasks = [];

if (localStorage.getItem("todo" )) {
    tasks = JSON.parse(localStorage.getItem("todo" ));
displayMessages();
}

button.addEventListener("click", () => {addTask()});


function addTask() {
    let newToDo = {
        text: message.value,
        checked: false,
        important: false
    }
    tasks.push(newToDo)
    displayMessages()
    localStorage.setItem("todo", JSON.stringify( tasks))
}

function displayMessages(params) {

    let newContent = " ";
    tasks.forEach( function (item, i) {
        console.log(item);
            newContent += `
                        <li>
                            <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : " "}>
                            <label for='item_${i}' class="${item.important ? "important" : " "}">${item.text} </label>
                        </li> 
                    `
                    todo.innerHTML = newContent
    
    message.value = " "
    })
    
    todo.addEventListener("change", function (e)  {
        let idInput = e.target.getAttribute('id');
        let forLabel = todo.querySelector('[for='+ idInput +']');
        let valueLabel = forLabel.innerHTML
        tasks.forEach( function (item) {

            if (item.text === valueLabel ) {
                item.checked = !item.checked;
                localStorage.setItem("todo", JSON.stringify( tasks))
            }
        })
        console.log(tasks);
        
    })
    todo.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        tasks.forEach(function (item) {
            // if (item.text === e.target.innerHTML )
            // { item.important = !item.important
            //     console.log(e.target.innerHTML);
            //     localStorage.setItem("todo", JSON.stringify( tasks))
            // }
            console.log(item.text);
            console.log(e.target.innerHTML)
        })
    })
}