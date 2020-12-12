import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent implements OnInit {
  isLoggedIn: string = window.localStorage.getItem('greatLakes_isLoggedIn');

  constructor() { }

  ngOnInit(): void {

  }

  logoutUser = () => {
        // Remove loggedin variable from local storage
        window.localStorage.removeItem('greatLakes_isLoggedIn')
        // Redirect user to home screen
        // Not using router because need to force a reload for the state to change
        window.location.href = '/buoyportal/all-lakes';
  }



}
