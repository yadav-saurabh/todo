import Common from "./common.js";
import Todos from "./todos.js";
const todos = new Todos();
const common = new Common();
class TodoAPP {
    /**
     * constructor initialize the app and ades some events
     */
    constructor() {
        /**
         * initilize the todo app
         */
        this.initTodo = () => {
            let todoData = common.getTodos();
            if (!todoData) {
                common.updateTodos(common.initTodo);
                common.updateUID(0);
                todoData = common.getTodos();
            }
            todoData.forEach(element => {
                common.todoElement.appendChild(todos.createTodo(element));
            });
        };
        /**
         * check if enter key is pressed and then call addTodo function
         * @param e
         */
        this.addTodoIfEnter = e => {
            if (e.keyCode === 13) {
                this.addTodo();
            }
        };
        /**
         * validate input and add the todo
         */
        this.addTodo = () => {
            /* check if input value is vaild string and not empty */
            if (!!common.addTodoTextInput.value.trim() &&
                !!!!common.addTodoHeadInput.value.trim()) {
                todos.addTodo();
            }
            else {
                alert("please enter some value");
            }
        };
        /**
         * change active tab
         * @param type
         */
        this.changeActiveTab = type => {
            common.filterTodoAllBtn.classList.remove("active");
            common.filterTodoCompletedBtn.classList.remove("active");
            common.filterTodoPendingBtn.classList.remove("active");
            if (type === null) {
                common.filterTodoAllBtn.classList.add("active");
            }
            else if (type === common.todoStatus.completed) {
                common.filterTodoCompletedBtn.classList.add("active");
            }
            else if (type === common.todoStatus.pending) {
                common.filterTodoPendingBtn.classList.add("active");
            }
        };
        /**
         * filter todos
         * @param status
         */
        this.todoFilter = status => {
            while (common.todoElement.hasChildNodes()) {
                common.todoElement.removeChild(common.todoElement.lastChild);
            }
            let todoData = [];
            if (status === null) {
                todoData = common.getTodos();
            }
            else {
                todoData = common.getTodos().filter(ele => ele.status === status);
            }
            todoData.forEach(element => {
                common.todoElement.appendChild(todos.createTodo(element));
            });
            if (todoData.length === 0) {
                const text = document.createElement("p");
                text.innerHTML = "no todos";
                common.todoElement.appendChild(text);
            }
        };
        /**
         * When the user clicks anywhere outside of the modal, close it
         * @param e
         */
        this.modalCloseOutside = e => {
            if (e.target == common.modal) {
                common.closeModal();
            }
        };
        // init todo on load of the app
        this.initTodo();
        // adding event on add todos
        common.addTodoTextInput.onkeypress = this.addTodoIfEnter;
        common.addTodoHeadInput.onkeypress = this.addTodoIfEnter;
        common.addTodoBtn.onclick = this.addTodo;
        // adding events on filter buttons
        common.filterTodoAllBtn.onclick = () => {
            this.changeActiveTab(null);
            this.todoFilter(null);
        };
        common.filterTodoCompletedBtn.onclick = () => {
            this.changeActiveTab(common.todoStatus.completed);
            this.todoFilter(common.todoStatus.completed);
        };
        common.filterTodoPendingBtn.onclick = () => {
            this.changeActiveTab(common.todoStatus.pending);
            this.todoFilter(common.todoStatus.pending);
        };
        // adding events on modal
        common.modalClose.onclick = common.closeModal;
        window.onclick = this.modalCloseOutside;
    }
}
const app = new TodoAPP();
