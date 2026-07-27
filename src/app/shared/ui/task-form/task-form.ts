import { Component, input, output } from '@angular/core';
import { Task } from '../../../features/tasks/Task';

@Component({
  selector: 'app-task-form',
  imports: [],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
})
export class TaskForm {
  tareasCompletadas = input<number>();
  agregado = output<string>();
  eliminarCompletadas = output<void>();
}
