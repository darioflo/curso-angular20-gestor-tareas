import { Injectable, inject } from '@angular/core';
import { computed, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './Task';

const STORAGE_KEY = 'tareas'; 
const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';
interface TodoApi {
  id: number;
  title: string;
  completed: boolean;
}
@Injectable({
  providedIn: 'root',
})

export class TaskStore {
  public readonly title = 'Gestor de Tareas';
  STORAGE_KEY = 'tareas';
  private readonly http = inject(HttpClient);
  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tareas()));
    });
  }
  tareas = signal<Task[]>(this.cargar());
  eliminarTarea: boolean = false;
  idTarea!: number;
  totalTareas = computed(() => this.tareas().length);
  cargando = signal(false);
  error = signal('');
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
  private cargar(): Task[] {
    const guardadas = localStorage.getItem(this.STORAGE_KEY);

    if (guardadas) {
      return JSON.parse(guardadas);
    }
    return [
      { id: 1, titulo: 'Aprender angular', completada: false },
      { id: 2, titulo: 'Construir un proyecto nuevo', completada: false },
      { id: 3, titulo: 'Dominar signals', completada: true },
    ];
  }
  public eliminarCompletadas(): void {
    this.tareas.update((lista) => lista.filter((tarea) => !tarea.completada));
  }

  cargarEjemplos(){
    this.cargando.set(true);
    this.error.set('');
    this.http.get<TodoApi[]>(API_URL).subscribe({
      next: (data) => {
        const tareas = data.map((item) => ({
          id: item.id,
          titulo: item.title,
          completada: item.completed,
        }));
        this.tareas.set(tareas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.log('Error al cargar las tareas de ejemplo: ', err);
        this.error.set('Error al cargar las tareas de ejemplo: ' + err.message);
        this.cargando.set(false);
      },
    });
  }
}
