import { Component, OnInit } from '@angular/core';
import { GlosService } from 'src/app/services/glos.service';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';

@Component({
  selector: 'app-buoy-details',
  templateUrl: './buoy-details.component.html',
  styleUrls: ['./buoy-details.component.scss']
})
export class BuoyDetailsComponent implements OnInit {
  weatherForecast;
  buoyInformation

  constructor(
    private weatherService: WeatherForecastService,
    private buoyService: GlosService
  ) { }

  ngOnInit(): void {
    this.weatherForecast = this.weatherService.getWeather().subscribe((response:any) => {
      console.log(response);
    });
    this.buoyInformation = this.buoyService.getGlos().subscribe((response:any) => {
      console.log(response);
    })
  }

}
