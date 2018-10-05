import Actions from "./actions.js";
import Common from "./common.js";
import AddTodos from "./addTodos.js";

const actions = new Actions();
const addTodos = new AddTodos();
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
    const todos = common.getTodos(); 
    if (!todos) {
      common.updateTodos(common.initTodo);
    }
    todos.forEach(element => {
      common.todoElement.appendChild(addTodos.add({id:1, text:'abc'}));  
    });
  };


  /**
   * invoking intTodo for initialization
   */
  // initTodo();

  // const editTodo = e => {
  //   const p = document.getElementById("tp");
  //   p.classList.remove("editing");
  //   console.log(e);
  //   console.log("blur");
  //   // changeTodoStatus;
  // };

}
const tp = new TodoAPP();
