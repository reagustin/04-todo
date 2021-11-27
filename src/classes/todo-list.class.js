import { Todo } from "./todo.class";


export class TodoList {

    constructor (){
        // this.todos = [];
        this.cargarLocalStorage();


    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id){

        this.todos = this.todos.filter( todo => todo.id != id); 
        // el filter devuelve un arreglo con todos los que cumplen con la condicion dentro del parentesis
        // La condicion dice, si el id es distinto, entonces filtralo y agregalo en el arreglo, cuando coincida el id, no lo va filtrar y lo deja afuera.
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
        for ( const todo of this.todos){
            

            if ( todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados(){
        //barrer el arreglo con todos los que tengan todo completado = true.
        this.todos = this.todos.filter( todo => !todo.completado); //filtra todos los que NO estan completados.
        this.guardarLocalStorage();
    }


    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
         
        this.todos  = (localStorage.getItem('todo')) 
                    ? JSON.parse(localStorage.getItem('todo')) 
                    : []


        // vamos ahora a usar el MAP que me va a permitir barrer cada uno de los elementos que hay dentro de un arreglo.
        this.todos = this.todos.map(obj => Todo.fromJson(obj));
        // this.todos = this.todos.map(Todo.fromJson); Esta es una manera mas sencilla de simplificar codigo.

    }
}