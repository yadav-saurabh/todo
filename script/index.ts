import Common from "./common.js";
import Todos from "./todos.js";

const todos = new Todos();
const common = new Common();

class TodoAPP {
  // const storage = new Storage();

  constructor() {
    this.initTodo();
  }

  /**
   * initilize the todo app
   */
  initTodo = () => {
    let todoData: Array<object> = common.getTodos();
    if (!todoData) {
      common.updateTodos(common.initTodo);
      common.updateUID(0);
      todoData = common.getTodos();
    }
    console.log(todoData);
    todoData.forEach(element => {
      common.todoElement.appendChild(todos.createTodo(element));
    });
  };
}
const app = new TodoAPP();
