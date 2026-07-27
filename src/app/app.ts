import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './features/tasks/Task';
import { TaskStore } from './features/tasks/task-store';
import { TaskItem } from "./shared/ui/task-item/task-item";
import { TaskForm } from "./shared/ui/task-form/task-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskItem, TaskForm],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  store = inject(TaskStore);
}
