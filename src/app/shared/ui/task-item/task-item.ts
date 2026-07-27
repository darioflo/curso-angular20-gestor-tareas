import { Component, input, output } from '@angular/core';
import { Task } from '../../../features/tasks/Task';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  task = input.required<Task>();
  toggle = output<number>();
  removed = output<number>();
  

}
