import { observable, action, computed } from "mobx";

class Store {
  @observable
  todos = [
    { title: "Javascript", status: "active" },
    { title: "JQuery", status: "active" },
    { title: "Angular", status: "active" },
    { title: "React", status: "active" }
  ];

  /**
   * Agregar valor a la lista
   */
  @action
  addTodo() {
    console.log("Agregar registro");
    this.todos.push({ title: Math.random().toString() });
  }

  /**
   * Borrar valor de la lista
   * @param title Valor a eliminar d ela lista
   */
  @action
  deleteTodo(title) {
    console.log("Borrar registro");
    const index = this.todos.findIndex((todo) => todo.title === title);
    this.todos.splice(index, 1);
  }

  /**
   * Actualizar el estado del valor de la lista
   * @param title Valor a actualizar de la lista
   */
  @action
  doneTodo(title) {
    console.log("Mostrar registro");
    const index = this.todos.findIndex((todo) => todo.title === title);

    // Listo
    // this.todos[index].status = "done";
    this.todos[index] = { title: title, status: "done" };
  }

  filter = "";
  @computed
  get filteredTodos() {
    return this.todos.filter((todo) => todo.title.includes(this.filter));
  }
}

export default new Store();
