import Actions from "./actions.js";
import Commen from "./common.js";

const common = new Commen();
const actions = new Actions();


export default class AddTodos {

  
  /**
   * create the todo element and retuns a node of the type <li>
   * @param object
   */
  add = (obj): HTMLElement => {

    const list = this.createElement("li", [{ type: 'id', handler: 'li' + obj.id }]);
    
    const label = this.createElement("label");
    label.append(
      this.createElement('input',[{ type: 'type', handler: 'checkbox' }, { type: "id", handler: "checkbox" + obj.id }, { type:'checked', handler: obj.status }], [{type: 'onchange', handler: 'changeTodoStatus'}]),
      this.createElement('span',[{ type: "className", handler: "checkbox" }])
    );

    const wrapper = this.createElement('div', [{ type: "className", handler: 'text-wrapper' }], [{ type: 'onclick', handler: 'changeTodoStatus' }]);    
    wrapper.append(
      this.createElement('span',[{ type: "id", handler: 'todo-text' + obj.id }, { type: "innerHTML", handler: obj.text }]),
      this.createElement('input', [{ type: "type", handler: "text" }, { type: "defaultValue", handler: obj.text }, { type: "id", handler: "edit-todo-input" + obj.id }], [{ type: 'onblur', handler: 'updateTodo' }, {type: 'onkeydown', handler: 'updateIfChanged'}])
    );

    list.append(
      label,
      this.createElement('button', [{ type: "id", handler: 'delete' + obj.id }], [{type: 'onclick', handler: 'deleteTodo'}]),
      this.createElement('button', [{ type: "id", handler: 'edit' + obj.id }], [{type: 'onclick', handler: 'editTodo'}]),
      wrapper
    );

    // document.getElementById('edit').addEventListener("keydown", e => {
    //   if (e.keyCode === 13) {
    //     //checks whether the pressed key is "Enter"
    //     actions.updateTodo(e);
    //   }
    // });

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
        temp[type] = actions[handler];
      });
    }
    return temp;
  };
}
