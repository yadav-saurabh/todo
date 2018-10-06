export default class Commen {
    constructor() {
        this.todoStatus = {
            completed: 1,
            pending: 0
        };
        this.initTodo = [{ id: 0, head: 'first todo', text: "lorem lipsum is a dummy test", status: this.todoStatus.pending }];
        this.todoItemId = 0;
        this.todoElement = document.getElementById("todo");
        this.addTodoBtn = document.getElementById("add-todo-btn");
        this.addTodoTextInput = document.getElementById("add-todo-text-input");
        this.addTodoHeadInput = document.getElementById("add-todo-head-input");
        this.editTodoHead = document.getElementById("edit-todo-head");
        this.editTodoText = document.getElementById("edit-todo-text");
        this.updaTodoBtn = document.getElementById("update-todo-btn");
        this.filterTodoAllBtn = document.getElementById("filter-todo-all");
        this.filterTodoCompletedBtn = document.getElementById("filter-todo-completed");
        this.filterTodoPendingBtn = document.getElementById("filter-todo-pending");
        this.modal = document.getElementById('my-modal');
        this.modalClose = document.getElementById("close");
        /**
         * get current todo id
         * @param e
         */
        this.getCurrTodoId = (e) => {
            return parseInt(e.target.id.replace(/[^0-9\.]/g, ""), 10);
        };
        /**
         * get todo object
         * @param id
         */
        this.getTodoById = (id) => {
            const todo = this.getTodos().find(obj => obj.id === id);
            return todo;
        };
        /**
         * get to do objevt index
         * @param id
         */
        this.findTodoIndex = (id) => {
            const index = this.getTodos().findIndex((obj) => obj.id === id);
            return index;
        };
        /**
         * show modal
         */
        this.showModal = () => {
            this.modal.style.display = "block";
        };
        /**
         * show modal
         */
        this.closeModal = () => {
            this.modal.style.display = "none";
        };
    }
    /**
     * to update browser localStorage
     * @param data
     */
    updateTodos(data) {
        console.log(data);
        localStorage.setItem("todos", JSON.stringify(data));
    }
    /**
     * to get browser localStorage
     */
    getTodos() {
        return JSON.parse(localStorage.getItem("todos"));
    }
    /**
     * to update browser localStorage
     * @param uid :number
     */
    updateUID(uid) {
        localStorage.setItem("uid", JSON.stringify(uid));
    }
    /**
     * to get browser localStorage
     */
    getUID() {
        return JSON.parse(localStorage.getItem("uid"));
    }
}
