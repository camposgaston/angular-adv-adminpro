import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public user: User;

  menuItems: any[];

  constructor(
    public sidebarService: SidebarService,
    private userService: UserService
  ) {

    this.user = userService.user;

    // console.log('menuItems:', this.menuItems);
  }

}
