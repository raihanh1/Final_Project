import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lake-all',
  templateUrl: './lake-all.component.html',
  styleUrls: ['./lake-all.component.scss']
})
export class LakeAllComponent implements OnInit {

  lakeBounds: google.maps.MapRestriction = {
    latLngBounds: {
      north: 51,
      south: 40,
      west: -100,
      east: -70,
    }
  }

  mapWidth = 1200;
  mapHeight = 600;
  mapOptions: google.maps.MapOptions = {
    center: { lat: 45, lng: -83.50 },
    zoom: 6,
    maxZoom: 13,
    minZoom: 6,
    restriction: this.lakeBounds,
    mapTypeId: 'hybrid',
    disableDefaultUI: true,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
