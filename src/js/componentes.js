import { Todo } from '../classes';

import {todoList} from '../index'
// ahora tengo que hacer referencia al elemento ul, el cual tiene como referencia por class todo-list
// referencias al HTML

const divTodoList = document.querySelector('.todo-list'); // el "." hace referencia a class, el "#" hace referencia a id

const txtInput = document.querySelector('.new-todo'); // hace referencia al input en el HTML

const btnBorrar = document.querySelector('.clear-completed');

const ulFiltros = document.querySelector('.filters');

const anchorFiltros = document.querySelectorAll('.filtro');

// vamos a crear un metodo que tenga el todo muy parecido en el html como lo tenemos en el index.

export const crearTodoHtml = (todo) => {
    // aca dentro tengo que recrear todo el li, para instertarlo todo en la lista ordenada que tengo.
    // en el classs del li si pongo completed, aparece tachado, y en el input si saco el checked al final, desaparece la marca
    // ahora en el class del li vamos a hacer una evaluacion ternaria de Js
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }> 
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`

    // previamente a utilizar abajo el divTodoList, tengo que crear el elemento HTML, arriba es solo un string de lo que voy a ocupar.

    const div = document.createElement('div');
    div.innerHTML = htmlTodo; //una vez hecho esto, si puedo insertarlo a continuacion, en el divTodoList
    // aca abajo voy a utilizar el divTodoList
    divTodoList.append(div.firstElementChild);  // NO ME INTERESA INSERTAR EL DIV, QUIERO EL PRIMER HIJO, O SEA EL li, firstElementChild
    
    return div.firstElementChild;

}

// EVENTOS

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);


        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }

});


divTodoList.addEventListener('click', (event) => {



    const nombreElemento = event.target.localName; // obtengo el nombre del elemento "label", "input", "button"
    const todoElemento = event.target.parentElement.parentElement; // tengo vision completa el elemento, li
    const todoId = todoElemento.getAttribute('data-id'); // puedo extraer el data-id del elemento. Usando getAttribute.

    console.log(nombreElemento);  
  

    if (nombreElemento.includes('input')) { //click en el check
        // todoList.marcarCompletado(todoId);
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');

    } else if (nombreElemento.includes('button')) {
        
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);

    }

});

btnBorrar.addEventListener('click', () => {
    
    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length-1; i>=0 ; i--){
        const elemento = divTodoList.children[i];
        // console.log(elemento);
        if (elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if (!filtro){ return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }

    }

})