let toDoList: Array<string> = [];
const todoElement = document.getElementById("todo");

function addTodo(): void {
  const text: string = (<HTMLInputElement>document.getElementById("addTodo"))
    .value;
  todoElement.appendChild(todoItem(text));
}

function todoItem(text): HTMLElement {
  let list = document.createElement("li");
  let div = document.createElement("div");
  div.innerHTML = text;
  list.appendChild(div);

  return list;
}
