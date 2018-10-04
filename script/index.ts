let todoList: Array<object> = [ { id: 0, text: 'first todo', status: 'pending' }];
let todoItemId = 0;

const todoElement = document.getElementById('todo');
const addTodoInput = <HTMLInputElement>document.getElementById('addTodoInput'); 



/**
 * adding event lister on pressing 'enter' key
 */
addTodoInput.addEventListener("keydown", e => {
  if (e.keyCode === 13) {//checks whether the pressed key is "Enter"
    addTodo();
  }
});


/**
 * initilize the todo app
 */
const initTodo = () => {
  for (todoItemId = 0; todoItemId < todoList.length; todoItemId++) {
    todoList[todoItemId]['id'] = todoItemId;
    todoElement.appendChild(addtodoItem(todoList[todoItemId]['text']));
  }
};


/**
 * add todos (list)
 * addes the li element to the DOM
 */
const addTodo = (): void => {
  /* check if input value is vaild string and not empty */
  if (!!addTodoInput.value.trim()) {
    todoList.push({ id: todoItemId, text: addTodoInput.value });
    todoElement.appendChild(addtodoItem(addTodoInput.value));
    addTodoInput.value = '';
  } else {
    alert('please enter some value');
  }
};

/**
 * delete a node (todo elememt)
 */
const deleteTodo = e => {
  const id = parseInt(e.toElement.id.replace(/[^0-9\.]/g, ''), 10);
  const index = todoList.findIndex((obj: any) => obj.id === id);
  todoList.splice(index, 1);
  todoElement.removeChild(document.getElementById('li' + id));
};

/**
 * edit a todo node
 */
const editTodo = _ => {
  console.log('edit');
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
  const wrapper = document.createElement("span");
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

  delbtn.onclick = deleteTodo;
  editbtn.onclick = editTodo;

  list.id = "li" + todoItemId;

  list.appendChild(label);
  list.appendChild(delbtn);
  list.appendChild(editbtn);
  list.appendChild(wrapper);

  todoItemId++;

  return list;
};



/**
 * invoking intTodo for initialization
 */
initTodo();
