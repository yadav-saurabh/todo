/**
 * to use LocalStorage of the browser
 */
export default class Storage {
    /**
     * to update browser localStorage
     * @param data
     */
    updateTodos(data) {
        localStorage.setItem('todos', JSON.stringify(data));
    }
    /**
     * to get browser localStorage
     */
    getTodos() {
        return JSON.parse(localStorage.getItem('todos'));
    }
    /**
     * to update browser localStorage
     * @param uid :number
     */
    updateUID(uid) {
        localStorage.setItem('uid', JSON.stringify(uid));
    }
    /**
     * to get browser localStorage
     */
    getUID() {
        return JSON.parse(localStorage.getItem('uid'));
    }
}
