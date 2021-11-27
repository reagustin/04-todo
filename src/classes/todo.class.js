

export class Todo {

    //vamos a crear un metodo estatico que pueda recibir objetos del json que parezcan un todo, o un ojbeto que parezca un todo.
    static fromJson({id, tarea, completado,creado}){ //usamos la desestructuracion de argumentos.
        const tempTodo = new Todo(tarea);

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;// tengo que regresar la instancia
        
        // la creacion de este static fromJson me va a permitir a mi recuperar mis metodos.
    }

    constructor(tarea) {
        this.tarea = tarea;

        this.id = new Date().getTime(); // 4534535354
        this.completado = false;
        this.creado = new Date();
    }
}