import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lake-ontario',
  templateUrl: './lake-ontario.component.html',
  styleUrls: ['./lake-ontario.component.scss']
})
export class LakeOntarioComponent implements OnInit {

  allLakeBounds: google.maps.MapRestriction = {
    latLngBounds: {
      north: 44.8,
      south: 42.5,
      west: -81,
      east: -75,
    }
  }

  mapWidth = 1200;
  mapHeight = 600;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 43.5, lng: -77.5 },
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
