import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(
    private http: HttpClient
  ) { }

  getWeather () {
    return this.http.get('https://api.openweathermap.org/data/2.5/onecall?lat=43&lon=-82&units=imerial&appid=7c2e5484f8998d0e2ca297b1fe5b7677');
  }
}
