import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { GlosService } from 'src/app/services/glos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-lake-all',
  templateUrl: './lake-all.component.html',
  styleUrls: ['./lake-all.component.scss']
})
export class LakeAllComponent implements OnInit {
  buoyInformation;
  buoy$;
  selectedId;
  id;
  buoysWithLinks = [];
  buoysWithLinkNames = [];
  chosenBuoy;
  chosenVideoLink;
  windSpeed;
  favorites;
  favoritesLocation = [];
  weatherInfo = [];
  weatherDegress = [];
  isLoggedIn;


  lakeBounds: google.maps.MapRestriction = {
    latLngBounds: {
      north: 51,
      south: 40,
      west: -100,
      east: -70,
    }
  }

  mapWidth = 1200;
  mapHeight = 540;
  mapOptions: google.maps.MapOptions = {
    center: { lat: 45, lng: -83.50 },
    zoom: 6,
    maxZoom: 13,
    minZoom: 6,
    restriction: this.lakeBounds,
    mapTypeId: 'hybrid',
    disableDefaultUI: true,
  };
  

  constructor(
    private buoyService: GlosService, 
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private weatherFinder: WeatherForecastService
  ) { }

  ngOnInit(): void {
    // Get localStorage
    this.favorites = JSON.parse(localStorage.getItem('favorites'));
    this.isLoggedIn = JSON.parse(localStorage.getItem('greatLakes_isLoggedIn'));

    // Get GLOS API and set to buoyInformation
    this.buoyService.getGlos().subscribe((response:any) => {
      this.buoyInformation = response;
      // Iterate over GLOS API
      for (var i = 0; i < this.buoyInformation.length; i++){
        // If buoy video isn't undefined, then push video and buoy name to arrays
        if(this.buoyInformation[i].webcamLink[0] !== undefined){
          this.buoysWithLinks.push(this.buoyInformation[i].webcamLink[0]);
          this.buoysWithLinkNames.push(this.buoyInformation[i].longName);
        }
        
        //Makes sure if favorites is not null
        if(this.favorites && this.favorites.length !== 0){
          //For loop is made to find the locations of the favorited buoys
          for(var x = 0; x < this.favorites.length; x++){
            if(this.buoyInformation[i].id == this.favorites[x].split(" ")[0]){
              //Adds their location
              this.favoritesLocation.push(this.buoyInformation[i].lat);
              this.favoritesLocation.push(this.buoyInformation[i].lon)
            }
          }
        }

      }
      
      this.buoysWithLinks.splice(1,1);
      var numberChosen = Math.floor((Math.random() * 14));
      var linkParse = this.buoysWithLinks[numberChosen].split('/');
      this.chosenBuoy = this.buoysWithLinkNames[numberChosen];
      this.chosenVideoLink = "https://www.limnotechdata.com/stations/albums/" + linkParse[4] + "/" + linkParse[4] + "720p.mp4";

      console.log(this.favoritesLocation);
      //Goes through the locations and adds the information to the array    
      for(var i = 0; i < this.favoritesLocation.length; i+=2){      
        this.weatherFinder.getWeatherExtra(this.favoritesLocation[i], this.favoritesLocation[i+1], "imperial").subscribe(res =>{
          this.weatherInfo.push(res);
          //Uses the degree to direction function
          this.weatherDegress.push(this.degToCompass(Number(res['wind']['speed'])));
        });
      }

      
    })   

    
    this.buoy$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.buoyService.getGlos();
      })
    );
  }

  routeToBuoy(buoy){
    this.router.navigateByUrl(`/buoyportal/${buoy}`);
  }

  degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }

  sanitize(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goToBuoy(i) {
    this.router.navigate([`/buoyportal/buoy/${this.buoyInformation[i].id}`])
  }

}
