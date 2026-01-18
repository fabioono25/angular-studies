import {
  Component,
  Input,
  Output,
  EventEmitter,
  computed,
  signal,
  input,
  output,
} from '@angular/core';
import { type User } from './user.model';
import { NgClass } from "../../../node_modules/@angular/common/index";
import { CardComponent } from '../shared/card/card.component';

// import { DUMMY_USERS } from '../dummy-users';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})

export class UserComponent {
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  // @Input({ required: true }) id!: string;
  // using signal-based inputs
  // avatar = input.required<string>();
  // name = input.required<string>();

  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected!: boolean;
  userSelected = output<string>();

  // @Output() userSelected = new EventEmitter<string>();

  // get imagePath() {
  //   return 'assets/users/' + this.avatar;
  // }
  imagePath = computed(() => {
    return 'assets/users/' + this.user.avatar;
  });

  onSelectUser() {
    // Intentionally left blank for now
    this.userSelected.emit(this.user.id);
  }

  // selectedUser = DUMMY_USERS[randomIndex];
  // selectedUser = signal(DUMMY_USERS[randomIndex]);

  // // without signal
  // get imagePath() {
  //   // return 'assets/users/' + this.selectedUser.avatar;
  //   return 'assets/users/' + this.selectedUser().avatar;
  // }

  // // with signal
  // imagePathComputed = computed(() => {
  //   return 'assets/users/' + this.selectedUser().avatar;
  // });

  // onSelectUser() {
  //   // this.selectedUser = DUMMY_USERS[Math.floor(Math.random() * DUMMY_USERS.length)];
  //   const newIndex = Math.floor(Math.random() * DUMMY_USERS.length);
  //   this.selectedUser.set(DUMMY_USERS[newIndex]);
  // }
}
