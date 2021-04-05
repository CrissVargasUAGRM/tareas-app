import { Tareas } from "./tareas.class";

export class TareaList {
    constructor() {
        this.tareas = [];
        this.cargarLocalStorage();
    }

    nuevaTarea(tarea) {
        this.tareas.push(tarea);
        this.guardarLocalStorage();
    }

    eliminarTarea(id) {
        this.tareas = this.tareas.filter(tarea => tarea.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        for (const tarea of this.tareas) {
            if (id == tarea.id) {
                tarea.completado = !tarea.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.tareas = this.tareas.filter(tarea => !tarea.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }

    cargarLocalStorage() {
        this.tareas = localStorage.getItem('tareas') ? JSON.parse(localStorage.getItem('tareas')) : [];

        this.tareas = this.tareas.map(objeto => Tareas.fromJson(objeto));
    }
}