import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Role, User } from '../user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  adminRole: Role = Role.Admin;
  user: User;
  constructor(private authService: AuthService) { }

  get AuthService() {
    return this.authService;
  }
  logOut() {
    this.authService.logout();
  }
  ngOnInit(): void { }

}
