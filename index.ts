let addTodoButton = document.getElementById("addTodoButton");
let todoList = document.getElementById("todoList");
let inputField = (<HTMLInputElement>document.getElementById("input__field"));
let clearListButton = document.getElementById("clearListButton");
let itemElement = document.getElementById("itemCount");

const baseURL = "http://localhost:3000"
const path = "todos"

var itemCount = 0;


//GET Request
const getPosts = () => {
    const postsEndpoint = [baseURL, path].join('/');
    fetch(postsEndpoint)
    .then(res => res.json())
    .then(data => {
        const posts = data.map((item) => {
    var todoItem = document.createElement("p");
    var todoText = document.createElement("p")
    var iconContainer = document.createElement('span')
    var trashIcon = document.createElement("i");
    var editIcon = document.createElement("i");
    todoItem.classList.add('todo__item');
    iconContainer.classList.add('icon__container');
    trashIcon.className = "fa-solid fa-trash";
    trashIcon.style.cursor = "pointer";
    editIcon.className = "fa-solid fa-pen";
    editIcon.style.cursor = "pointer"
    todoText.innerText = item.title; 
    todoList?.appendChild(todoItem);
    todoItem.appendChild(todoText)
    todoItem.appendChild(iconContainer)
    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(trashIcon);
    inputField.value = "";
    itemCount++;
    setItemCount();
    todoText.addEventListener('click', function(){
         todoText.style.textDecoration = "line-through"
         todoItem.style.order = "2"
    })
    todoText.addEventListener('dblclick', function (){
        todoText.style.textDecoration = "initial"
        todoItem.style.order = "initial" 
    })
    trashIcon.addEventListener('click', function (){
        todoList?.removeChild(todoItem);
        itemCount--;
        setItemCount();
        deletePost(item.id); 
    })
    editIcon.addEventListener('click', function(){
        var editContainer = document.createElement('div');
        var editField = document.createElement("input");
        var checkIcon = document.createElement("i");
        checkIcon.className = "fa-solid fa-square-check";
        editContainer.className = "edit__container"
        editField.className = "edit__field"
        checkIcon.style.cursor = "pointer";
        editField.type = "text";
        editField.value = todoText.innerText;
        editContainer.appendChild(editField)
        editContainer.appendChild(checkIcon)
        todoItem.appendChild(editContainer)
        todoText.style.display = "none"
        checkIcon.addEventListener("click", function () {
             todoText.innerText = editField.value;
             updatePost(editField.value, item.id)
             todoText.style.display = "unset"
             editField.style.display = "none"
             checkIcon.style.display = "none"
               })

    })   
        })
        
    })
    .catch(error => console.log(error)) 
}
getPosts();

//POST Request
const postTodo = (title) => {
    const postsEndpoint = [baseURL, path].join('/');
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "title": title,
            "completed": false,
            
        })
    }
    fetch (postsEndpoint, options )
    .then(res => {
        if (res.ok) {console.log("Succesfully Posted!")}
        else {console.log("Post Unsuccesful!")}
        return res
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

//DELETE Request
const deletePost = (id) => {
    const postsEndpoint = [baseURL, path, id].join('/');
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        } 
    }
    fetch (postsEndpoint, options )
    .then(res => {
        if (res.ok) {console.log("Succesfully Deleted!")}
        else {console.log("Post Did NOT Delete!")}
        return res
    })
    .then(res => console.log(res))
}

const deleteAllPost = () => {
    const postsEndpoint = [baseURL, path].join('/');
    fetch(postsEndpoint)
    .then(res => res.json())
    .then(data => {
             data.forEach((item) => { 
                deletePost(item.id) 
         })
        
    })
}

clearListButton?.addEventListener('click', function(){
    deleteAllPost();
})

//DELETE All Request
// const deleteAllPost = (id) => {
//     const postsEndpoint = [baseURL, path, id].join('/');
//     const options = {
//         method: 'DELETE',
//         headers: {
//             'Content-type': 'application/json'
//         } 
//     }
//     fetch (postsEndpoint, options )
//     .then(res => {
//         if (res.ok) {console.log("Succesfully Deleted!")}
//         else {console.log("Post Did NOT Delete!")}
//         return res
//     })
//     .then(res => console.log(res))
// }



// PUT
const updatePost = (todoName, id) => {
    const postsEndpoint = [baseURL, path, id].join('/');
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "title": todoName,
            "completed": false
            
        })
    }
    fetch (postsEndpoint, options )
    .then(res => {
        if (res.ok) {console.log("Succesfully Updated!")}
        else {console.log("Post Did NOT Update!")}
        return res
    })
    .then(res => res.json())
    .then(data => console.log(data))
}


const setItemCount = () => {
if(itemElement != undefined)
itemElement.textContent = itemCount.toString();
}
setItemCount();


const addItem = () => {
    var todoItem = document.createElement("p");
    var todoText = document.createElement("p")
    var iconContainer = document.createElement('span');
    var trashIcon = document.createElement("i");
    var editIcon = document.createElement("i");
    todoItem.classList.add('todo__item');
    iconContainer.classList.add('icon__container');
    trashIcon.className = "fa-solid fa-trash";
    trashIcon.style.cursor = "pointer"
    editIcon.className = "fa-solid fa-pen";
    editIcon.style.cursor = "pointer"
    todoText.innerText = inputField?.value; 
    todoList?.appendChild(todoItem);
    todoItem.appendChild(todoText)
    todoItem.appendChild(iconContainer)
    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(trashIcon);
    postTodo(inputField?.value);
    inputField.value = "";
    itemCount++;
    setItemCount();
    todoItem.addEventListener('click', function(){
        todoText.style.textDecoration = "line-through";
    })

    //DELETE Trash Icon
   trashIcon.addEventListener('click', function (){
                todoList?.removeChild(todoItem);
                itemCount--;
                setItemCount();
                // deletePost(todo.id)        
            })

    // EDIT Icon
    editIcon.addEventListener('click', function(){
        var editField = document.createElement("input");
        editField.value = todoText.innerHTML;
        todoItem.appendChild(editField)
        todoText.style.display = "none"
        editField.addEventListener("keydown", function (event) {
             if (event.key === "Enter")
             todoText.innerHTML = editField.value;
             editField.style.display = "none"
             todoItem.style.display = "unset"
               })

    })        
        
    }

    //Clear List Functionality
const clearList = () => {
    if(confirm("Are you sure you want to clear your to-do list?") && todoList !=undefined){
        todoList.innerHTML= "";
        itemCount = 0;
        setItemCount();
    }
}

addTodoButton?.addEventListener ('click', addItem);

inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter")
    addItem();
})
clearListButton?.addEventListener('click', clearList);

const createInput = () => {
     
        // paragraph.style.display = "hidden"
    var editField = document.createElement("input");
    // editField.value = todoText.innerHTML;
    editField.addEventListener("keydown", function (event) {
        if (event.key === "Enter")
        addItem();
    })
}
