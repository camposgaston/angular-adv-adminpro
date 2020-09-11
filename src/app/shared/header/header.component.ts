import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public imgUrl = '';

  constructor(private userService: UserService) {
    this.imgUrl = userService.user.imageUrl;
  }

  logout() {
    this.userService.logout();
  }

}
