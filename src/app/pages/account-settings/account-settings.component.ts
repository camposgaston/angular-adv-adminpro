import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  // get link element id='theme' currently index.html file for changing href of theme's css
  public linkTheme = document.querySelector('#theme');
  // get all li with class 'selector'
  public links: NodeListOf<Element>;
  constructor() { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme(theme: string): void {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  // check currently used theme, with 'workig' class
  checkCurrentTheme(): void {

    this.links.forEach(elem => {
      // first remove 'woking' class
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');
      // assign class if is selected / used
      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    });
  }


}
