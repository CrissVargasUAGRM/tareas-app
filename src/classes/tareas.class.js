export class Tareas {

    /* para arregla que lo que se guarda en el localStorage sea un arreglo y que sea un arrglo de instancias*/
    static fromJson({ id, tarea, completado, creado }) {
        const tempTarea = new Tareas(tarea);
        this.id = id;
        this.completado = completado;
        this.creado = creado;
        return tempTarea;
    }

    constructor(tarea) {
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }
}