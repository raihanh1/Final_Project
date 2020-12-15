import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class GlosService {
  constructor(private http: HttpClient) {}

  getGlos() {
    return this.http.get<any>(
      'https://glbuoys.glos.us/static/Buoy_tool/data/meta_english.json'
    );
  }

  filterValues(nameArray: any[], valuesArray: any[]) {
    const WSIdx = nameArray.indexOf('Wind Speed');
    const WSValue = valuesArray[WSIdx];
    const WTIdx = nameArray.indexOf('Water Temp');
    const WTValue = valuesArray[WTIdx];
    const WHIdx = nameArray.indexOf('Wave Height')
    const WHValue = valuesArray[WHIdx];
    console.log(WHValue, 'wave height');

  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
