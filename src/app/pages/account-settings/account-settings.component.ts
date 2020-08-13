import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  private links: NodeListOf<Element>;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    // get all li with class 'selector', type: NodeListOf<Element>
    this.links = document.querySelectorAll('.selector');
    this.settingsService.checkCurrentTheme(this.links);
  }

  changeTheme(theme: string): void {
    this.settingsService.changeTheme(theme, this.links);
  }



}
