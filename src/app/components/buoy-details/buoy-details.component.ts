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
  buoyInformation;
  lon;
  lat;

  constructor(
    private weatherService: WeatherForecastService,
    private buoyService: GlosService
  ) { }

  ngOnInit(): void {
    this.buoyService.getGlos().subscribe((response:any) => {
      this.buoyInformation = response;
      console.log(response[0]);
      this.weatherService.getWeather(response[0].lat, response[0].lon).subscribe((response:any) => {
        console.log(response);
        this.weatherForecast = response;
      });
    });

  }

}
