import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuToggleService {
  menuIsOpen = false;

  constructor() { }

  toggleMenu = () => {
    this.menuIsOpen = !this.menuIsOpen;
  }

  getMenuIsOpen = () => {
    return this.menuIsOpen;
  }
  
}

