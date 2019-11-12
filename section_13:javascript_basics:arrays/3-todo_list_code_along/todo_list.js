var request = prompt("What would you like to do?");
var todoList = new Array();

while (request !== "quit"){
    if (request === "new"){
       addTodo();
    }
    else if (request === "list"){
        listTodo();
    }
    else if (request === "delete"){
        deleteTodo();
    }
    request = prompt("What would you like to do?");
}

console.log("OK, YOU QUIT THE APP")

// Functions
function addTodo(){
    var newTodo = prompt("Enter a new todo")
    todoList.push(newTodo)
    console.log(newTodo + " added to the list")
}

function listTodo(){
    console.log("**********")
    todoList.forEach(function(todo, i){
        console.log(i + ": " + todo)
    })
    console.log("**********")
}

function deleteTodo(){
    var indexToDelete = prompt("Enter index of todo to delete");
    todoList.splice(indexToDelete, 1);
    console.log("Todo removed")
}