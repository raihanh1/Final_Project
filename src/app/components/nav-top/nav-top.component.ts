import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuToggleService } from '../../services/menu-toggle.service';

@Component({
  selector: 'nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent implements OnInit {
  isLoggedIn: string = window.localStorage.getItem('greatLakes_isLoggedIn');

  constructor(private router: Router, private menuToggle: MenuToggleService) { }

  ngOnInit(): void {

  }

  toHome = () => {
    this.router.navigateByUrl(`/buoyportal/all-lakes`);
  }

  logoutUser = () => {
        // Remove loggedin variable from local storage
        window.localStorage.removeItem('greatLakes_isLoggedIn')
        // Redirect user to home screen
        // Not using router because need to force a reload for the state to change
        window.location.href = '/buoyportal/all-lakes';
  }

  toggleMenu = () => {
    this.menuToggle.toggleMenu();
  }

  // openMenu = () => {
  //   const sideNav = document.querySelector('.nav-side-ctn');
  //   sideNav.style.display = 'block';
  // }

}
