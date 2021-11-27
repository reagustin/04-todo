// import { TodoList } from "./classes/todo-list.class";
// import { Todo } from "./classes/todo.class";

import {Todo, TodoList} from './classes';
import { crearTodoHtml } from './js/componentes';
import'./styles.css';


export const todoList = new TodoList(); //creo mi instancia de la clase TodoList

// const tarea = new Todo('Aprender JavaScript'); //creao la instancia de la tarea Todo

// todoList.nuevoTodo(tarea); // luego de crear la instancia arriba tengo que mandarlo a array

// tarea.completado = true;
// console.log(todoList);
// crearTodoHtml(tarea);

todoList.todos.forEach( todo => crearTodoHtml(todo));


console.log('todos', todoList.todos);