import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // get link element with id='theme' currently index.html file,
  // in order to change its href link to the theme's css
  private linkTheme = document.querySelector('#theme');

  constructor() {

    // Sets theme css from localStorege or default
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);

  }

  changeTheme(theme: string, links: NodeListOf<Element>): void {
    // Sets given theme css
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    // saves theme in localStorage
    localStorage.setItem('theme', url);
    this.checkCurrentTheme(links);
  }


  // check currently used theme, with 'workig' class
  checkCurrentTheme(links: NodeListOf<Element>): void {

    // get all li with class 'selector' from links: NodeListOf<Element>
    links.forEach(elem => {
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
