import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
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

  constructor(
    private weatherService: WeatherForecastService,
    private buoyService: GlosService,
    private route: ActivatedRoute,
   
  ) { 
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id, "id");
    

    private buoyService: GlosService
  ) {
    console.log("constructor--------------")
   }

  ngOnInit(): void {
    console.log("component mounted +++++++++++++++++++")
    this.buoyService.getGlos().subscribe((response:any) => {
      this.buoyInformation = response;
      this.currentBuoy = this.buoyInformation.find((x) => {return x.id === this.id});
      console.log(this.currentBuoy, "buoy information");
      this.weatherService.getWeather(this.currentBuoy.lat, this.currentBuoy.lon).subscribe((response:any) => {
        console.log(response);
        this.weatherForecast = response;
      });
    });
  });
  }

}
