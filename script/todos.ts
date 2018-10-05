import Commen from "./common.js";

const common = new Commen();

export default class Todos {

  constructor() {
    common.addTodoInput.addEventListener("keydown", e => {
      if (e.keyCode === 13) { // checks whether the pressed key is "Enter"
        this.addTodo();
      }
    });
  }

  /**
   * create the todo element and retuns a node of the type <li>
   * @param object
   */
  createTodo = (obj): HTMLElement => {
    // creates a list element
    const list = this.createElement("li", [{ type: 'id', handler: 'li' + obj.id }]);
    // creates a label element with a input and span as childs
    const label = this.createElement("label");
    label.append(
      this.createElement('input',[{ type: 'type', handler: 'checkbox' }, { type: "id", handler: "checkbox" + obj.id }, { type:'checked', handler: obj.status }], [{type: 'onchange', handler: 'changeTodoStatus'}]),
      this.createElement('span',[{ type: "className", handler: "checkbox" }])
      );
    // creates a wrapper div with h3, span and input as child
    const wrapper = this.createElement('div', [{ type: "className", handler: 'text-wrapper' }], [{ type: 'onclick', handler: 'changeTodoStatus' }]);    
      wrapper.append(
      this.createElement('h3', [{ type: 'id', handler: 'todo-head' + obj.id },{ type: "innerHTML", handler: obj.head }]),
      this.createElement('span',[{ type: "id", handler: 'todo-text' + obj.id }, { type: "innerHTML", handler: obj.text }]),
      this.createElement('input', [{ type: "type", handler: "text" }, { type: "defaultValue", handler: obj.text }, { type: "id", handler: "edit-todo-input" + obj.id }], [{ type: 'onblur', handler: 'updateTodo' }, {type: 'onkeydown', handler: 'updateIfChanged'}])
    );
    // append the label and wrapper to the list element along with edit and delete buttons
    list.append(
      label,
      this.createElement('button', [{ type: "id", handler: 'delete' + obj.id }], [{type: 'onclick', handler: 'deleteTodo'}]),
      this.createElement('button', [{ type: "id", handler: 'edit' + obj.id }], [{type: 'onclick', handler: 'editTodo'}]),
      wrapper
    );

    return list;
  };

  /**
   * dynamically create elements
   * @param elementName
   * @param options
   * @param events
   */
  createElement = (elementName, options?, events?) => {
    const temp = document.createElement(elementName);
    if (!!options) {
      options.forEach(({ type, handler }) => {
        temp[type] = handler;
      });
    }
    if (!!events) {
      events.forEach(({ type, handler }) => {
        temp[type] = this[handler];
      });
    }
    return temp;
  };

  /**
   * add todos (list)
   * addes the li element to the DOM
   */
  addTodo = _ => {
    /* check if input value is vaild string and not empty */
    if (!!common.addTodoInput.value.trim()) {
      const data = {
        id: 1 + common.getUID(),
        text: common.addTodoInput.value,
        status: common.todoStatus.pending
      };
      const todoData = (common.getTodos());
      todoData.push(data);
      common.updateTodos(todoData);
      common.todoElement.appendChild(this.createTodo(data));
      common.updateUID(1 + common.getUID());
      common.addTodoInput.value = "";
    } else {
      alert("please enter some value");
    }
  };

  /**
   * delete a node (todo elememt)
   * @param e
   * @type Event
   */
  deleteTodo = e => {
    const id = common.getCurrTodoId(e);
    const index = common.findTodoIndex(id);
    const todoData = common.getTodos();
    todoData.splice(index, 1)
    common.updateTodos(todoData);
    common.todoElement.removeChild(document.getElementById("li" + id));
  };

  /**
   * edit a todo node
   * @param e
   * @type Event
   */
  editTodo = e => {
    const id = common.getCurrTodoId(e);
    const list = document.getElementById("li" + id);
    list.classList.add("editing");
    document.getElementById("edit-todo-input" + id).focus();
  };

  /**
   *  change todo status
   *  @param e
   *  @type Event
   */
  updateTodo = e => {
    const id = common.getCurrTodoId(e);
    const index = common.findTodoIndex(id);
    const list = document.getElementById("li" + id);
    list.classList.remove("editing");
    const todoData = (common.getTodos());
    todoData[index]['text'] = e.target.value;
    common.updateTodos(todoData);
    document.getElementById("todo-text" + id).innerHTML = e.target.value;
  };

  /**
   * change the todo status
   * @param e 
   * @type Event
   */
  changeTodoStatus = e => {
    const {nodeName, type} = e.target;
    if (nodeName === "SPAN" || (nodeName === "INPUT" && type === "checkbox")) {
      const id = common.getCurrTodoId(e);
      const index = common.findTodoIndex(id);
      const list = document.getElementById("li" + id);
      list.classList.toggle("completed");
      const chkbox = <HTMLInputElement>document.getElementById("checkbox" + id);
      const todoData = common.getTodos();
      if (todoData[index]["status"] === common.todoStatus.completed) {
        todoData[index]["status"] = common.todoStatus.pending;
        chkbox.checked = false;
      } else {
        todoData[index]["status"] = common.todoStatus.completed;
        chkbox.checked = true;
      }
      common.updateTodos(todoData);
    }
  };

  /**
   * update/edit todo
   * @param e 
   * @type Event
   */
  updateIfChanged = e => {
    if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
      this.updateTodo(e);
    }
  };
}
