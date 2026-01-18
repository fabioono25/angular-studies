import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from '../../task/task.model';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<NewTask>();

  // enteredTitle = '';
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDueDate = signal('');

  private taskService = inject(TaskService);

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    // this.add.emit({
    //   title: this.enteredTitle(),
    //   summary: this.enteredSummary(),
    //   dueDate: this.enteredDueDate(),
    // });
    this.taskService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        dueDate: this.enteredDueDate(),
      },
      this.userId,
    );
    this.close.emit();
  }
}
