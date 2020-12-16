import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlosService } from 'src/app/services/glos.service';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-buoy-details',
  templateUrl: './buoy-details.component.html',
  styleUrls: ['./buoy-details.component.scss'],
})
export class BuoyDetailsComponent implements OnInit {
  weatherForecast;
  buoyInformation;
  lon;
  lat;
  id;
  currentBuoy;
  obsName;
  waveHeight;
  windSpeed;
  waterTemp;
  chosenBuoy;
  chosenVideoLink;
  buoysWithLinks = [];
  buoysWithLinkNames = [];

  mapWidth = 144;
  mapHeight = 144;
  mapOptions: google.maps.MapOptions = {
    center: { lat: 44.75, lng: -82 },
    zoom: 10,
    maxZoom: 10,
    minZoom: 10,
    mapTypeId: 'hybrid',
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    draggable: false,
  };

  constructor(
    private weatherService: WeatherForecastService,
    private buoyService: GlosService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.buoyService.getGlos().subscribe((response:any) => {
      this.buoyInformation = response;
      // Iterate over GLOS API
      for (var i = 0; i < this.buoyInformation.length; i++){
        // If buoy video isn't undefined, then push video and buoy name to arrays
        if(this.buoyInformation[i].webcamLink[0] !== undefined){
          this.buoysWithLinks.push(this.buoyInformation[i].webcamLink[0]);
          this.buoysWithLinkNames.push(this.buoyInformation[i].longName);
        }
      }
      this.buoysWithLinks.splice(1,1);
      var numberChosen = Math.floor((Math.random() * 14));
      var linkParse = this.buoysWithLinks[numberChosen].split('/');
      this.chosenBuoy = this.buoysWithLinkNames[numberChosen];
      this.chosenVideoLink = "https://www.limnotechdata.com/stations/albums/" + linkParse[4] + "/" + linkParse[4] + "720p.mp4";
    })
    
    
    // Routing from the click event
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      // Getting the GLOS API and using the long and lat to call the weather API
      this.buoyService.getGlos().subscribe((response: any) => {
        this.buoyInformation = response;
        this.currentBuoy = this.buoyInformation.find((x) => {
          return x.id === this.id;
        });
        console.log(this.currentBuoy, 'buoy information');
        

        this.weatherService
        // Using the lat and lon from currentBuoy to get the weather for that buoy
          .getWeather(this.currentBuoy.lat, this.currentBuoy.lon)
          .subscribe((response: any) => {
            this.weatherForecast = response;
          });
      });
    });
  
  }
  
  sanitize(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
    if (favorites){
      return favorites.includes(buoyId);
    }
  }

  // filterValues = (longName) => {
  //   if (this.currentBuoy.obsLongName !== undefined) {
  //     const idx = this.currentBuoy.obsLongName.indexOf(longName);
  //     let value = this.currentBuoy.obsValue[idx];
  //     console.log(value, 'value');
  //     return value;
  //   }
  // }
    
  
  // filterValues(nameArray: any[], valuesArray: any[]) {
  //   const WSIdx = nameArray.indexOf('Wind Speed');
  //   const WSValue = valuesArray[WSIdx];
  //   const WTIdx = nameArray.indexOf('Water Temp');
  //   const WTValue = valuesArray[WTIdx];
  //   const WHIdx = nameArray.indexOf('Wave Height')
  //   const WHValue = valuesArray[WHIdx];
  // }

  swimmingSafe() {
    if (this.WTValue > 70) {
      return true
    }
  } 
}
