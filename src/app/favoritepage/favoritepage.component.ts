import { Component, OnInit } from '@angular/core';
import { GlosService } from '../services/glos.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritepage',
  templateUrl: './favoritepage.component.html',
  styleUrls: ['./favoritepage.component.scss']
})
export class FavoritepageComponent implements OnInit {
    distance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = Math.PI * lat1/180
    let radlat2 = Math.PI * lat2/180
    let theta = lon1-lon2
    let radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
  }
  constructor(private glosService: GlosService, private router: Router) {}
  buoys;
  calcDistances = {};
  nearestBuoys;
  favoriteBuoys = [];
  currentBuoy;

  
  ngOnInit(): void {
    this.glosService.getGlos().subscribe((result: any) => {
      this.buoys = result;  

      
      this.glosService.getPosition().then(pos=>
      {
        for(let i = 0; i < this.buoys.length; i++){
          this.calcDistances[this.buoys[i].id + " " + this.buoys[i].longName] = this.distance(pos.lng, pos.lat, this.buoys[i].lon, this.buoys[i].lat, "N");
        }     
        
        let keyValues = [];

        for (let key in this.calcDistances) {
          keyValues.push([ key, this.calcDistances[key] ])
        }

        keyValues.sort(function compare(kv1, kv2){
          return kv1[1] - kv2[1]
        })
        
        this.nearestBuoys = keyValues.slice(0,3);
        });
    });
  }

  addToFavorites(buoy){
    this.favoriteBuoys.push(buoy);
  }

  removeFromFavorites(index){
    this.favoriteBuoys.splice(index, 1);
  }

  toggleFavorite = (buoyId) => {
    let favorites = JSON.parse(window.localStorage.getItem('favorites'));
    if (!favorites) {
      favorites = [];
    }
    if (favorites.includes(buoyId)) {
      // remove from favorites
      const indexOfBuoyToRemove = favorites.findIndex((favorite) => favorite === buoyId);
      favorites.splice(indexOfBuoyToRemove, 1);
      window.localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      favorites.push(buoyId);
      window.localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  isFavorite = (buoyId) => {
    let favorites = JSON.parse(window.localStorage.getItem('favorites'));
    if(favorites) {
      return favorites.includes(buoyId);
    }  
  }

}
