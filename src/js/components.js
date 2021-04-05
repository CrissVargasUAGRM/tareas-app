import '../css/componentes.css';
import { Tareas } from "../classes/index";
import { tareasList } from "../index";

const divTareaList = document.querySelector('.todo-list');

export const crearTareaHtml = (tarea) => {
    const htmlTarea = `
    <li class="${(tarea.completado) ? 'completed' : ''}" data-id="${tarea.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(tarea.completado) ? 'checked' : ''}>
            <label>${tarea.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');

    div.innerHTML = htmlTarea;

    divTareaList.append(div.firstElementChild);

    return div.firstElementChild;
};

const txtInput = document.querySelector('.new-todo');

//Eventos 
txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode == 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        const nuevaTarea = new Tareas(txtInput.value);
        tareasList.nuevaTarea(nuevaTarea);
        crearTareaHtml(nuevaTarea);
        txtInput.value = '';
    }
});

divTareaList.addEventListener('click', (event) => {
    const tareaElement = event.target.localName; //input button label etc
    const listaElement = event.target.parentElement.parentElement;
    const idElement = listaElement.getAttribute('data-id');
    if (tareaElement.includes('input')) {
        tareasList.marcarCompletado(idElement);
        listaElement.classList.toggle('completed');
    } else if (tareaElement.includes('button')) {
        tareasList.eliminarTarea(idElement);
        divTareaList.removeChild(listaElement);
    }
});

const btnButton = document.querySelector('.clear-completed');

btnButton.addEventListener('click', () => {
    tareasList.eliminarCompletados();

    for (let i = divTareaList.children.length - 1; i >= 0; i--) {
        const elemento = divTareaList.children[i];
        if (elemento.classList.contains('completed')) {
            divTareaList.removeChild(elemento);
        }
    }
});

//filtros
const filtro = document.querySelector('.filters');
const enlaceFiltro = document.querySelectorAll('filtro');

filtro.addEventListener('click', (event) => {
    const filtrar = event.target.text;

    if (!filtrar) { return; }
    enlaceFiltro.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    for (const elemento of divTareaList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtrar) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
            default:
                break;
        }
    }

});