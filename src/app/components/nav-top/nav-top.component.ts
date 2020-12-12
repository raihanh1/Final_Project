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
    // Set variable that is accessible from the HTML
    // That variable will access the local storage
    console.log(typeof this.isLoggedIn);
  }



}
