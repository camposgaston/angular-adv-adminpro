import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public totalUsers = 0;
  public users: User[] = [];
  public from = 0;
  public loading = true;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.from)
      .subscribe(({ total, users }) => {
        this.totalUsers = total;
        if (users.length !== 0) {
          this.users = users;
        }
        this.loading = false;
      });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }

    this.getUsers();
  }

}
