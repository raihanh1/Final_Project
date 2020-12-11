import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlosService } from 'src/app/services/glos.service';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';

@Component({
  selector: 'app-buoy-details',
  templateUrl: './buoy-details.component.html',
  styleUrls: ['./buoy-details.component.scss']
})
export class BuoyDetailsComponent implements OnInit {
  weatherForecast;
  buoyInformation;
  lon;
  lat;
  id;
  currentBuoy;
  waveHeight;

  mapWidth = 144;
  mapHeight = 144;

  constructor(
    private weatherService: WeatherForecastService,
    private buoyService: GlosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Routing from the click event
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id, "id");
    

    // Getting the GLOS API and using the long and lat to call the weather API
    this.buoyService.getGlos().subscribe((response:any) => {
      this.buoyInformation = response;
      this.currentBuoy = this.buoyInformation.find((x) => {return x.id === this.id});
      console.log(this.currentBuoy, "buoy information");
      this.waveHeight = this.currentBuoy.NWSForecast.waveheight[0];
      console.log(this.waveHeight, 'wave height');
      this.weatherService.getWeather(this.currentBuoy.lat, this.currentBuoy.lon).subscribe((response:any) => {
        console.log(response);
        this.weatherForecast = response;
      });
    });
  });
  }
  

}
