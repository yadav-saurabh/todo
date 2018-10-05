const todoStatus = {
  completed: 1,
  pending: 0
};

let todoList: Array<object> = [
  { id: 0, text: "first todo", status: todoStatus.pending }
];
let todoItemId: number = 0;

const todoElement = <HTMLUListElement>document.getElementById("todo");
const addTodoInput = <HTMLInputElement>document.getElementById("addTodoInput");

/**
 * adding event lister on pressing 'enter' key
 */
addTodoInput.addEventListener("keydown", e => {
  if (e.keyCode === 13) {
    //checks whether the pressed key is "Enter"
    addTodo();
  }
});

/**
 * initilize the todo app
 */
const initTodo = () => {
  for (todoItemId = 0; todoItemId < todoList.length; todoItemId++) {
    todoList[todoItemId]["id"] = todoItemId;
    todoElement.appendChild(addtodoItem(todoList[todoItemId]["text"]));
  }
};

/**
 * add todos (list)
 * addes the li element to the DOM
 */
const addTodo = (): void => {
  /* check if input value is vaild string and not empty */
  if (!!addTodoInput.value.trim()) {
    todoList.push({
      id: todoItemId,
      text: addTodoInput.value,
      status: todoStatus.pending
    });
    todoElement.appendChild(addtodoItem(addTodoInput.value));
    addTodoInput.value = "";
  } else {
    alert("please enter some value");
  }
};

/**
 * delete a node (todo elememt)
 */
const deleteTodo = e => {
  const id = parseInt(e.target.id.replace(/[^0-9\.]/g, ""), 10);
  const index = todoList.findIndex((obj: any) => obj.id === id);
  todoList.splice(index, 1);
  todoElement.removeChild(document.getElementById("li" + id));

};

/**
 * edit a todo node
 */
const editTodo = e => {
  const id = parseInt(e.target.id.replace(/[^0-9\.]/g, ""), 10);
  const list = document.getElementById('li'+ id);
  list.classList.add('editing');
  document.getElementById('editTodoInput' + id).focus();
};

/**
 * change todo status
 */
 const updateTodo = (e) => {
  const id = parseInt(e.target.id.replace(/[^0-9\.]/g, ""), 10);
  const list = document.getElementById('li'+ id);
  list.classList.remove('editing');
  const index = todoList.findIndex((obj: any) => obj.id === id);
  todoList[index]['text'] = e.target.value;
  document.getElementById('todoText'+id).innerHTML = e.target.value; 
 };

/**
 * change the todo status
 */
const changeTodoStatus = e => {
  if (
    e.target.nodeName === "SPAN" ||
    (e.target.nodeName === "INPUT" && e.target.type === "checkbox")
  ) {
    const list = e.target.parentNode.parentNode;
    list.classList.toggle("completed");
    const id = parseInt(list.id.replace(/[^0-9\.]/g, ""), 10);
    const index = todoList.findIndex((obj: any) => obj.id === id);
    const chkbox = <HTMLInputElement>document.getElementById("chk" + id);
    if (todoList[index]["status"] === todoStatus.completed) {
      todoList[index]["status"] = todoStatus.pending;
      chkbox.checked = false;
    } else {
      todoList[index]["status"] = todoStatus.completed;
      chkbox.checked = true;
    }
  }
};

/**
 * create the todo element and retuns a node of the type <li>
 * @param text
 */
const addtodoItem = (text: string): HTMLElement => {
  const list = document.createElement("li");
  const label = document.createElement("label");
  const chkbox = document.createElement("input");
  const chkboxSpan = document.createElement("span");
  const delbtn = document.createElement("button");
  const editbtn = document.createElement("button");
  const wrapper = document.createElement("div");
  const todoText = document.createElement("span");
  const todoEdit = document.createElement("input");

  chkbox.type = "checkbox";

  chkboxSpan.className = "checkbox";

  label.appendChild(chkbox);
  label.appendChild(chkboxSpan);
  todoText.innerHTML = text;
  todoEdit.type = "text";
  todoEdit.defaultValue = text;
  
  wrapper.className = "text-wrapper";
  wrapper.appendChild(todoText);
  wrapper.appendChild(todoEdit);

  delbtn.id = "delete" + todoItemId;
  editbtn.id = "edit" + todoItemId;
  chkbox.id = "chk" + todoItemId;
  todoEdit.id = 'editTodoInput' + todoItemId;
  todoText.id = 'todoText' + todoItemId;

  todoEdit.addEventListener("keydown", e => {
    if (e.keyCode === 13) {
      //checks whether the pressed key is "Enter"
      updateTodo(e);
    }
  });

  delbtn.onclick = deleteTodo;
  editbtn.onclick = editTodo;
  chkbox.onchange = changeTodoStatus;
  wrapper.onclick = changeTodoStatus;
  todoEdit.onblur = updateTodo;

  list.id = "li" + todoItemId;

  [label, delbtn, editbtn, wrapper].forEach(elements => {
    list.appendChild(elements);
  });

  todoItemId++;

  return list;
};

/**
 * invoking intTodo for initialization
 */
initTodo();

// const editTodo = e => {
//   const p = document.getElementById("tp");
//   p.classList.remove("editing");
//   console.log(e);
//   console.log("blur");
//   // changeTodoStatus;
// };
