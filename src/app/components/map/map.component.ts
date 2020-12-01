import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: google.maps.Map;

  // All Lakes Starting Position
  greatLakesBounds = {
    north: 49.74,
    south: 41.15,
    west: -93.28,
    east: -75.27,
  };

  centerOnMichigan = { lat: 44.31, lng: -85.60 };


  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: this.centerOnMichigan,
      restriction: {
        latLngBounds: this.greatLakesBounds,
        strictBounds: false,
      },
      zoom: 0,
      disableDefaultUI: true,
    });
  }


}
