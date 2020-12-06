import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lake-erie',
  templateUrl: './lake-erie.component.html',
  styleUrls: ['./lake-erie.component.scss']
})
export class LakeErieComponent implements OnInit {

  allLakeBounds: google.maps.MapRestriction = {
    latLngBounds: {
      north: 44,
      south: 40,
      west: -85,
      east: -77,
    }
  }

  mapWidth = 1200;
  mapHeight = 600;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 42.25, lng: -81 },
    zoom: 8,
    maxZoom: 13,
    minZoom: 8,
    restriction: this.allLakeBounds,
    mapTypeId: 'hybrid',
    disableDefaultUI: true,
  };


  constructor() { }

  ngOnInit(): void {
  }

}
