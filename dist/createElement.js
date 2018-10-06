import Actions from "./actions.js";
const actions = new Actions();
/**
 * dynamically create elements
 * @param elementName
 * @param options
 * @param events
 */
export const createElement = (elementName, options, events) => {
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
