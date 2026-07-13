import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './models/Task';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'Gestor de Tareas';
  tareas = signal<Task[]>([
    { id: 1, titulo: 'Aprender angular', completada: false },
    { id: 2, titulo: 'Construir proyecto nuevo', completada: false },
    { id: 3, titulo: 'Dominar signals', completada: false },
  ]);
  eliminarTarea: boolean = false;
  idTarea!: number;
  totalTareas = computed(() => this.tareas().length);
  tareasPendientes = computed(() => this.totalTareas() - this.tareasCompletadas());
  tareasCompletadas = computed(() => this.tareas().filter((tarea) => tarea.completada).length);

  agregar(tarea: string) {
    const limpio = tarea.trim();
    if (!limpio) return;

    this.tareas.update((lista) => [
      ...lista,
      { id: Date.now(), titulo: limpio, completada: false },
    ]);
  }

  mostrarAlerta(id: number): void {
    this.eliminarTarea = true;
    this.idTarea = id;
  }

  eliminar(): void {
    this.eliminarTarea = true;
    this.tareas.update((lista) => lista.filter((lista) => lista.id !== this.idTarea));
    this.idTarea = 0;
    this.eliminarTarea = false;
  }

  toggle(id: number): void {
    this.tareas.update((lista) =>
      lista.map((tarea) => (tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea)),
    );
  }
}
