import React from "react";
import { StyleSheet, Text, View, Button } from "react-native-web";
import { observer } from "mobx-react";
import Store from "./Store";

@observer
export default class App extends React.Component {
  render() {
    return (
      <div>
        <View style={styles.container}>
          {Store.todos.map((todo) => (
            <View key={todo.title} style={[styles.todo, styles[todo.status]]}>
              <Text>{todo.title}</Text>
              <Button
                title="Borrar"
                onPress={() => Store.deleteTodo(todo.title)}
              />
              <div style={{ height: "5px" }}></div>
              <Button
                title="Mostrar"
                onPress={() => Store.doneTodo(todo.title)}
              />
            </View>
          ))}
          <Button title="Agregar" onPress={() => Store.addTodo()} />
        </View>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 50,
    backgroundColor: "#ffffff"
  },
  todo: {
    padding: 10,
    margin: 5,
    height: 110,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#C4D2DC",
    height: "130px",
    width: "200px"
  },
  done: {
    backgroundColor: "#B4A09F"
  }
});
