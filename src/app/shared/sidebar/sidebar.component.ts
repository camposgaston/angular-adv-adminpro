import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public imgUrl = '';
  constructor(private sidebarService: SidebarService,
    private userService: UserService) {
    this.imgUrl = userService.user.imageUrl;
    this.menuItems = sidebarService.menu;
    // console.log('menuItems:', this.menuItems);
  }

  ngOnInit(): void {
  }

}
