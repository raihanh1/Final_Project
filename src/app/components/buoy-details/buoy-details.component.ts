import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';

@Component({
  selector: 'app-buoy-details',
  templateUrl: './buoy-details.component.html',
  styleUrls: ['./buoy-details.component.scss']
})
export class BuoyDetailsComponent implements OnInit {
  weather;

  constructor(
    private weatherForecast: WeatherForecastService
  ) { }

  ngOnInit(): void {
    this.weather = this.weatherForecast.getWeather().subscribe((response:any) => {
      console.log(response);
    });
  }

}
