import React from "react";
import ReactDOM from "react-dom";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import App from "./App";

// Ejemplo de contador -suma/resta-
const appState = observable({
  count: 0
});

appState.increment = function() {
  this.count++;
};

appState.decrement = function() {
  this.count--;
};

@observer
class Counter extends React.Component {
  render() {
    return (
      <div>
        Contador: {appState.count} <br />
        <button onClick={this.handleDec}> - </button>
        <button onClick={this.handleInc}> + </button>
      </div>
    );
  }

  handleInc = () => {
    this.props.store.increment();
  };

  handleDec = () => {
    this.props.store.decrement();
  };
}

// Ejemplo incrementa segundos transcurridos
var timerData = observable({
  secondsPassed: 0
});

setInterval(() => {
  timerData.secondsPassed++;
}, 1000);

// Alternatively, a class based component:
@observer
class Timer extends React.Component {
  render() {
    return <span>Seconds passed: {this.props.timerData.secondsPassed} </span>;
  }
}

// Ejemplo todoList

class Todo {
  id = Math.random();
  @observable title;
  @observable finished = false;
  constructor(title) {
    this.title = title;
  }
}

class TodoList {
  @observable todos = [];
  @computed get unfinishedTodoCount() {
    return this.todos.filter((todo) => !todo.finished).length;
  }
}

@observer
class TodoListView extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.todoList.todos.map((todo) => (
            <TodoView todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.todoList.unfinishedTodoCount}
      </div>
    );
  }
}

const TodoView = observer(({ todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => (todo.finished = !todo.finished)}
    />
    {todo.title}
  </li>
));

const store = new TodoList();

store.todos.push(new Todo("Get Coffee"), new Todo("Write simpler code"));
store.todos[0].finished = true;

ReactDOM.render(
  <div>
    <h4>Contador suma/Resta</h4>
    <Counter store={appState} />
    <hr />
    <h4>Mostrar segundos</h4>
    <Timer timerData={timerData} />
    <hr />
    <h4>Todo - lista</h4>
    <TodoListView todoList={store} />
    <hr />
    <h4>Ejemplo practico</h4>
    <App />
  </div>,
  document.getElementById("root")
);

if (module.hot) {
  // Activa el modulo de actualizacion si el plugin esta instalado
  module.hot.accept();
}
