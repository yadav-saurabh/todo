import Commen from "./common.js";

const common = new Commen();

export default class Todos {

  /**
   * create the todo element and retuns a node of the type <li>
   * @param object
   */
  createTodo = (obj): HTMLElement => {
    // creates a list element
    const list = this.createElement("li", [{ type: 'id', handler: 'li' + obj.id }, { type:'className', handler: 'item' }]);
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
      this.createElement('span',[{ type: "id", handler: 'todo-text' + obj.id }, { type: "innerHTML", handler: obj.text }])
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
  addTodo = () => {
      const data = {
        id: 1 + common.getUID(),
        head: common.addTodoHeadInput.value,
        text: common.addTodoTextInput.value,
        status: common.todoStatus.pending
      };
      const todoData = (common.getTodos());
      todoData.push(data);
      common.updateTodos(todoData);
      common.todoElement.appendChild(this.createTodo(data));
      common.updateUID(1 + common.getUID());
      common.addTodoTextInput.value = "";
      common.addTodoHeadInput.value = "";
  };

  /**
   * delete a node (todo elememt)
   * @param e
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
   */
  editTodo = e => {
    common.showModal();
    const id = common.getCurrTodoId(e);
    const currData = common.getTodoById(id);
    common.editTodoHead.defaultValue = currData.head; 
    common.editTodoText.defaultValue = currData.text; 
    common.updaTodoBtn.onclick =  () => this.updateIfChanged(id);
  };

  /**
   * change the todo status
   * @param e 
   */
  changeTodoStatus = e => {
    const {nodeName, type} = e.target;
    if (nodeName === "SPAN" || nodeName === "H3" || (nodeName === "INPUT" && type === "checkbox")) {
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
   * @param id 
   * @type number
   */
  updateIfChanged = (id :number) => {
    console.log(id);
    const storedData = common.getTodoById(id);
    const currTodoHead = common.editTodoHead.value;
    const currTodoText = common.editTodoText.value;
    if(storedData.head !== currTodoHead.toString() || storedData.text !== currTodoText.toString()) {
      const todoData = (common.getTodos());
      const index = common.findTodoIndex(id);
      todoData[index]['head'] = currTodoHead;
      todoData[index]['text'] = currTodoText;
      common.updateTodos(todoData);
      document.getElementById('todo-head'+ id).innerHTML = currTodoHead;
      document.getElementById('todo-text'+ id).innerHTML = currTodoText;
    }
    common.closeModal()
  };
}
