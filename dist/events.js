import Common from "./common.js";
import AddTodos from "./addTodos.js";
const common = new Common();
const addTodos = new AddTodos();
/**
 *
 */
export default class Actions {
    constructor() {
        /**
         * add todos (list)
         * addes the li element to the DOM
         */
        this.addTodo = () => {
            /* check if input value is vaild string and not empty */
            // if (!!common.addTodoInput.value.trim()) {
            //   const data = {
            //     id: this.todoItemId,
            //     text: this.addTodoInput.value,
            //     status: this.todoStatus.pending
            //   };
            //   this.todoList.push(data);
            //   localStorage.setItem("todos", JSON.stringify(this.todoList));
            //   common.todoElement.appendChild(this.addtodoItem(data));
            //   this.addTodoInput.value = "";
            // } else {
            //   alert("please enter some value");
            // }
        };
        /**
         * delete a node (todo elememt)
         */
        this.deleteTodo = e => {
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
            document.getElementById("editTodoInput" + id).focus();
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
        // adding event lister of pressing 'enter' key on addTodo input
        common.addTodoInput.addEventListener("keydown", e => {
            if (e.keyCode === 13) {
                //checks whether the pressed key is "Enter"
                // addTodos.add({});
                // this.addTodo();
            }
        });
    }
}
