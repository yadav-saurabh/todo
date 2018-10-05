export default class Commen {
  todoStatus = {
    completed: 1,
    pending: 0
  };

  initTodo = [{ id: 0, text: "first", status: this.todoStatus.pending }];
  todoItemId: number = 0;

  todoElement = <HTMLUListElement>document.getElementById("todo");
  addTodoInput = <HTMLInputElement>document.getElementById("addTodoInput");

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
   */
  getCurrTodoId = (e): number => {
    return parseInt(e.target.id.replace(/[^0-9\.]/g, ""), 10);
  };

  /**
   * get todo object
   */
  getTodoById = (id: number) => {
    const todos = this.getTodos();
    return todos[id];
  };

  /**
   * get to do objevt index
   */
  findTodoIndex = (id: number) => {
    const index = this.getTodos().findIndex((obj: any) => obj.id === id);
    return index;
  };
}
