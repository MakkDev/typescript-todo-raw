var addTodoButton = document.getElementById("addTodoButton");
var todoList = document.getElementById("todoList");
var inputField = document.getElementById("input__field");
var clearListButton = document.getElementById("clearListButton");
var itemElement = document.getElementById("itemCount");
var baseURL = "http://localhost:3000";
var path = "todos";
var itemCount = 0;
//GET Request
var getPosts = function () {
    var postsEndpoint = [baseURL, path].join('/');
    fetch(postsEndpoint)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var posts = data.map(function (item) {
            var todoItem = document.createElement("p");
            var todoText = document.createElement("p");
            var iconContainer = document.createElement('span');
            var trashIcon = document.createElement("i");
            var editIcon = document.createElement("i");
            todoItem.classList.add('todo__item');
            iconContainer.classList.add('icon__container');
            trashIcon.className = "fa-solid fa-trash";
            trashIcon.style.cursor = "pointer";
            editIcon.className = "fa-solid fa-pen";
            editIcon.style.cursor = "pointer";
            todoText.innerText = item.title;
            todoList === null || todoList === void 0 ? void 0 : todoList.appendChild(todoItem);
            todoItem.appendChild(todoText);
            todoItem.appendChild(iconContainer);
            iconContainer.appendChild(editIcon);
            iconContainer.appendChild(trashIcon);
            inputField.value = "";
            itemCount++;
            setItemCount();
            todoText.addEventListener('click', function () {
                todoText.style.textDecoration = "line-through";
                todoItem.style.order = "2";
            });
            todoText.addEventListener('dblclick', function () {
                todoText.style.textDecoration = "initial";
                todoItem.style.order = "initial";
            });
            trashIcon.addEventListener('click', function () {
                todoList === null || todoList === void 0 ? void 0 : todoList.removeChild(todoItem);
                itemCount--;
                setItemCount();
                deletePost(item.id);
            });
            editIcon.addEventListener('click', function () {
                var editContainer = document.createElement('div');
                var editField = document.createElement("input");
                var checkIcon = document.createElement("i");
                checkIcon.className = "fa-solid fa-square-check";
                editContainer.className = "edit__container";
                editField.className = "edit__field";
                checkIcon.style.cursor = "pointer";
                editField.type = "text";
                editField.value = todoText.innerText;
                editContainer.appendChild(editField);
                editContainer.appendChild(checkIcon);
                todoItem.appendChild(editContainer);
                todoText.style.display = "none";
                checkIcon.addEventListener("click", function () {
                    todoText.innerText = editField.value;
                    updatePost(editField.value, item.id);
                    todoText.style.display = "unset";
                    editField.style.display = "none";
                    checkIcon.style.display = "none";
                });
            });
        });
    })["catch"](function (error) { return console.log(error); });
};
getPosts();
//POST Request
var postTodo = function (title) {
    var postsEndpoint = [baseURL, path].join('/');
    var options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "title": title,
            "completed": false
        })
    };
    fetch(postsEndpoint, options)
        .then(function (res) {
        if (res.ok) {
            console.log("Succesfully Posted!");
        }
        else {
            console.log("Post Unsuccesful!");
        }
        return res;
    })
        .then(function (res) { return res.json(); })
        .then(function (data) { return console.log(data); });
};
//DELETE Request
var deletePost = function (id) {
    var postsEndpoint = [baseURL, path, id].join('/');
    var options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    };
    fetch(postsEndpoint, options)
        .then(function (res) {
        if (res.ok) {
            console.log("Succesfully Deleted!");
        }
        else {
            console.log("Post Did NOT Delete!");
        }
        return res;
    })
        .then(function (res) { return console.log(res); });
};
var deleteAllPost = function () {
    var postsEndpoint = [baseURL, path].join('/');
    fetch(postsEndpoint)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        data.forEach(function (item) {
            deletePost(item.id);
        });
    });
};
clearListButton === null || clearListButton === void 0 ? void 0 : clearListButton.addEventListener('click', function () {
    deleteAllPost();
});
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
var updatePost = function (todoName, id) {
    var postsEndpoint = [baseURL, path, id].join('/');
    var options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "title": todoName,
            "completed": false
        })
    };
    fetch(postsEndpoint, options)
        .then(function (res) {
        if (res.ok) {
            console.log("Succesfully Updated!");
        }
        else {
            console.log("Post Did NOT Update!");
        }
        return res;
    })
        .then(function (res) { return res.json(); })
        .then(function (data) { return console.log(data); });
};
var setItemCount = function () {
    if (itemElement != undefined)
        itemElement.textContent = itemCount.toString();
};
setItemCount();
var addItem = function () {
    var todoItem = document.createElement("p");
    var todoText = document.createElement("p");
    var iconContainer = document.createElement('span');
    var trashIcon = document.createElement("i");
    var editIcon = document.createElement("i");
    todoItem.classList.add('todo__item');
    iconContainer.classList.add('icon__container');
    trashIcon.className = "fa-solid fa-trash";
    trashIcon.style.cursor = "pointer";
    editIcon.className = "fa-solid fa-pen";
    editIcon.style.cursor = "pointer";
    todoText.innerText = inputField === null || inputField === void 0 ? void 0 : inputField.value;
    todoList === null || todoList === void 0 ? void 0 : todoList.appendChild(todoItem);
    todoItem.appendChild(todoText);
    todoItem.appendChild(iconContainer);
    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(trashIcon);
    postTodo(inputField === null || inputField === void 0 ? void 0 : inputField.value);
    inputField.value = "";
    itemCount++;
    setItemCount();
    todoItem.addEventListener('click', function () {
        todoText.style.textDecoration = "line-through";
    });
    //DELETE Trash Icon
    trashIcon.addEventListener('click', function () {
        todoList === null || todoList === void 0 ? void 0 : todoList.removeChild(todoItem);
        itemCount--;
        setItemCount();
        // deletePost(todo.id)        
    });
    // EDIT Icon
    editIcon.addEventListener('click', function () {
        var editField = document.createElement("input");
        editField.value = todoText.innerHTML;
        todoItem.appendChild(editField);
        todoText.style.display = "none";
        editField.addEventListener("keydown", function (event) {
            if (event.key === "Enter")
                todoText.innerHTML = editField.value;
            editField.style.display = "none";
            todoItem.style.display = "unset";
        });
    });
};
//Clear List Functionality
var clearList = function () {
    if (confirm("Are you sure you want to clear your to-do list?") && todoList != undefined) {
        todoList.innerHTML = "";
        itemCount = 0;
        setItemCount();
    }
};
addTodoButton === null || addTodoButton === void 0 ? void 0 : addTodoButton.addEventListener('click', addItem);
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter")
        addItem();
});
clearListButton === null || clearListButton === void 0 ? void 0 : clearListButton.addEventListener('click', clearList);
var createInput = function () {
    // paragraph.style.display = "hidden"
    var editField = document.createElement("input");
    // editField.value = todoText.innerHTML;
    editField.addEventListener("keydown", function (event) {
        if (event.key === "Enter")
            addItem();
    });
};
