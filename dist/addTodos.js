import Actions from "./actions.js";
import Commen from "./common.js";
const common = new Commen();
const actions = new Actions();
/**
 * adds todos to the dom
 */
export default class AddTodos {
    constructor() {
        /**
         * create the todo element and retuns a node of the type <li>
         * @param object
         */
        this.add = (obj) => {
            const list = this.createElement("li", [{ type: 'id', handler: 'li' + obj.id }]);
            const label = this.createElement("label");
            label.append(this.createElement('input', [{ type: 'type', handler: 'checkbox' }, { type: "id", handler: "checkbox" + obj.id }, { type: 'checked', handler: obj.status }], [{ type: 'onchange', handler: 'changeTodoStatus' }]), this.createElement('span', [{ type: "className", handler: "checkbox" }]));
            const wrapper = this.createElement('div', [{ type: "className", handler: 'text-wrapper' }], [{ type: 'onclick', handler: 'changeTodoStatus' }]);
            wrapper.append(this.createElement('span', [{ type: "id", handler: 'todo-text' + obj.id }, { type: "innerHTML", handler: obj.text }]), this.createElement('input', [{ type: "type", handler: "text" }, { type: "defaultValue", handler: obj.text }, { type: "id", handler: "edit-todo-input" + obj.id }], [{ type: 'onblur', handler: 'updateTodo' }, { type: 'onkeydown', handler: 'updateIfChanged' }]));
            list.append(label, this.createElement('button', [{ type: "id", handler: 'delete' + obj.id }], [{ type: 'onclick', handler: 'deleteTodo' }]), this.createElement('button', [{ type: "id", handler: 'edit' + obj.id }], [{ type: 'onclick', handler: 'editTodo' }]), wrapper);
            return list;
        };
        /**
         * dynamically create elements
         * @param elementName
         * @param options
         * @param events
         */
        this.createElement = (elementName, options, events) => {
            const temp = document.createElement(elementName);
            if (!!options) {
                options.forEach(({ type, handler }) => {
                    temp[type] = handler;
                });
            }
            if (!!events) {
                events.forEach(({ type, handler }) => {
                    temp[type] = actions[handler];
                });
            }
            return temp;
        };
        /**
         * add todos (list)
         * addes the li element to the DOM
         */
        this.addTodo = () => {
            /* check if input value is vaild string and not empty */
            if (!!common.addTodoInput.value.trim()) {
                const data = {
                    id: common.getUID(),
                    text: common.addTodoInput.value,
                    status: common.todoStatus.pending
                };
                localStorage.setItem("todos", JSON.stringify(data));
                // common.todoElement.appendChild(add(data));
                common.updateUID(common.getUID() + 1);
                common.addTodoInput.value = "";
            }
            else {
                alert("please enter some value");
            }
        };
        /**
         * delete a node (todo elememt)
         */
        this.deleteTodo = e => {
            console.log("delete");
            console.log(e);
            // const id = common.getCurrTodoId(e);
            // const index = common.findTodoIndex(id);
            // common.updateTodos(common.getTodos().splice(index, 1));
            // common.todoElement.removeChild(document.getElementById("li" + id));
        };
        /**
         * edit a todo node
         */
        this.editTodo = e => {
            const id = parseInt(e.target.id.replace(/[^0-9\.]/g, ""), 10);
            const list = document.getElementById("li" + id);
            list.classList.add("editing");
            document.getElementById("edit-todo-input" + 1).focus();
        };
        /**
         * change todo status
         */
        this.updateTodo = e => {
            // const id = parseInt(e.target.id.replace(/[^0-9\.]/g, ""), 10);
            // const list = document.getElementById("li" + id);
            // list.classList.remove("editing");
            // const index = this.todoList.findIndex((obj: any) => obj.id === id);
            // this.todoList[index]["text"] = e.target.value;
            // storage.updateData(this.todoList);
            // document.getElementById("todoText" + id).innerHTML = e.target.value;
        };
        /**
         * change the todo status
         */
        this.changeTodoStatus = e => {
            // if (
            //   e.target.nodeName === "SPAN" ||
            //   (e.target.nodeName === "INPUT" && e.target.type === "checkbox")
            // ) {
            //   const list = e.target.parentNode.parentNode;
            //   list.classList.toggle("completed");
            //   const id = parseInt(list.id.replace(/[^0-9\.]/g, ""), 10);
            //   const index = this.todoList.findIndex((obj: any) => obj.id === id);
            //   const chkbox = <HTMLInputElement>document.getElementById("chk" + id);
            //   if (this.todoList[index]["status"] === this.todoStatus.completed) {
            //     this.todoList[index]["status"] = this.todoStatus.pending;
            //     chkbox.checked = false;
            //   } else {
            //     this.todoList[index]["status"] = this.todoStatus.completed;
            //     chkbox.checked = true;
            //   }
            //   common.updateTodos(this.todoList);
        };
        this.updateIfChanged = e => {
            if (e.keyCode === 13) {
                //checks whether the pressed key is "Enter"
                // actions.updateTodo(e);
            }
        };
        common.addTodoInput.addEventListener("keydown", e => {
            if (e.keyCode === 13) {
                //checks whether the pressed key is "Enter"
                this.addTodo();
            }
        });
    }
}
