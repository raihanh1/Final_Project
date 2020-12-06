import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lake-huron',
  templateUrl: './lake-huron.component.html',
  styleUrls: ['./lake-huron.component.scss']
})
export class LakeHuronComponent implements OnInit {

  allLakeBounds: google.maps.MapRestriction = {
    latLngBounds: {
      north: 47,
      south: 42,
      west: -86,
      east: -78,
    }
  }

  mapWidth = 1200;
  mapHeight = 600;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 44.75, lng: -82 },
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
