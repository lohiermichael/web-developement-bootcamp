var request = prompt("What would you like to do?");
var todoList = new Array();

while (request !== "quit"){
    if (request === "new"){
        var newTodo = prompt("Enter a new todo")
        todoList.push(newTodo)
    }
    else if (request === "list"){
        console.log(todoList)
    }
    request = prompt("What would you like to do?");
}