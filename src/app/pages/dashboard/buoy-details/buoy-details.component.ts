import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlosService } from 'src/app/services/glos.service';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';

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

  constructor(
    private weatherService: WeatherForecastService,
    private buoyService: GlosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
        this.obsName = this.currentBuoy.obsLongName;

        this.weatherService
        // Using the lat and lon from currentBuoy to get the weater for that buoy
          .getWeather(this.currentBuoy.lat, this.currentBuoy.lon)
          .subscribe((response: any) => {
            this.weatherForecast = response;
          });
      });
    });
    this.filterValues();
  }
  filterValues() {
    this.buoyService.filterValues(this.obsName, 'Water Temp');
  }
}
