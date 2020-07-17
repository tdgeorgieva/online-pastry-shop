import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: User;
  users: User[];
  constructor(private userService: UserService) {}

  deleteUser(id: string): void {
    console.log('delete');
    this.userService.remove(id).subscribe(() => this.userService.findAll().subscribe(users => this.users = users));
  }
  ngOnInit(): void {
    this.userService.findAll().subscribe(users => this.users = users);
  }


}
