import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lake-superior',
  templateUrl: './lake-superior.component.html',
  styleUrls: ['./lake-superior.component.scss']
})
export class LakeSuperiorComponent implements OnInit {

  allLakeBounds: google.maps.MapRestriction = {
    latLngBounds: {
      north: 50,
      south: 45.75,
      west: -93.5,
      east: -83,
    }
  }

  mapWidth = 1200;
  mapHeight = 600;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 47.25, lng: -87.5 },
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