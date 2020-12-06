import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lake-michigan',
  templateUrl: './lake-michigan.component.html',
  styleUrls: ['./lake-michigan.component.scss']
})
export class LakeMichiganComponent implements OnInit {

  allLakeBounds: google.maps.MapRestriction = {
    latLngBounds: {
      north: 46.5,
      south: 40,
      west: -89,
      east: -84,
    }
  }

  mapWidth = 1200;
  mapHeight = 600;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 43.9, lng: -86 },
    zoom: 7,
    maxZoom: 13,
    minZoom: 7,
    restriction: this.allLakeBounds,
    mapTypeId: 'hybrid',
    disableDefaultUI: true,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
