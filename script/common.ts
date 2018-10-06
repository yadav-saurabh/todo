export default class Commen {
  todoStatus = {
    completed: 1,
    pending: 0
  };

  initTodo = [{ id: 0, head: 'first todo', text: "lorem lipsum is a dummy test", status: this.todoStatus.pending }];
  todoItemId: number = 0;

  todoElement = <HTMLUListElement>document.getElementById("todo");
  addTodoBtn = <HTMLButtonElement>document.getElementById("add-todo-btn");
  addTodoTextInput = <HTMLInputElement>document.getElementById("add-todo-text-input");
  addTodoHeadInput = <HTMLInputElement>document.getElementById("add-todo-head-input");

  editTodoHead = <HTMLInputElement>document.getElementById("edit-todo-head");
  editTodoText = <HTMLInputElement>document.getElementById("edit-todo-text");
  updaTodoBtn =  <HTMLButtonElement>document.getElementById("update-todo-btn");

  filterTodoAllBtn = <HTMLButtonElement>document.getElementById("filter-todo-all");
  filterTodoCompletedBtn = <HTMLButtonElement>document.getElementById("filter-todo-completed");
  filterTodoPendingBtn = <HTMLButtonElement>document.getElementById("filter-todo-pending");

  modal = <HTMLDivElement> document.getElementById('my-modal');
  modalClose = <HTMLSpanElement> document.getElementById("close");

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
  updateUID(uid: number) {
    localStorage.setItem("uid", JSON.stringify(uid));
  }

  /**
   * to get browser localStorage
   */
  getUID() {
    return JSON.parse(localStorage.getItem("uid"));
  }

  /**
   * get current todo id
   * @param e
   */
  getCurrTodoId = (e): number => {
    return parseInt(e.target.id.replace(/[^0-9\.]/g, ""), 10);
  };

  /**
   * get todo object
   * @param id
   */
  getTodoById = (id: number) => {
    const todo = this.getTodos().find(obj=> obj.id === id);
    return todo;
  };

  /**
   * get to do objevt index
   * @param id
   */
  findTodoIndex = (id: number) => {
    const index = this.getTodos().findIndex((obj: any) => obj.id === id);
    return index;
  };

  /**
   * show modal
   */
  showModal = () => {
    this.modal.style.display = "block";
  }

  /**
   * show modal
   */
  closeModal = () => {
    this.modal.style.display = "none";
  }
}
