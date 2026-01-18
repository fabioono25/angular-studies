import { Component, Input } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTask } from '../task/task.model';

import { TaskService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) id?: string;
  @Input({ required: true }) name?: string;
  isAddingTask = false;

  constructor(private taskService: TaskService) {}

  get selectedUserTasks() {
    return this.taskService.getUserTasks(this.id!);
  }

  // onCompleteTask(taskId: string) {
  //   // Intentionally left blank for now
  //   // console.log('Task completed: ' + taskId);  
  //   this.taskService.removeTask(taskId);
  // }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }

  // onAddTask(task: NewTask) {
  //   this.taskService.addTask(task, this.id!);
  //   this.isAddingTask = false;
  // }
}
