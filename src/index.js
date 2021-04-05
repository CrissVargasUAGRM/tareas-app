import { TareaList, Tareas } from "./classes/index";
import { crearTareaHtml } from "./js/components";
import './style.css';

export const tareasList = new TareaList();

//const tarea = new Tareas("Aprendiendo JS");

/* tareasList.nuevaTarea(tarea);

crearTareaHtml(tarea); */

tareasList.tareas.forEach(crearTareaHtml);
console.log(tareasList);