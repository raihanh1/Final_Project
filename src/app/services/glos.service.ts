import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GlosService {

  constructor(
    private http: HttpClient
  ) { }

  getGlos () {
    return this.http.get('https://glbuoys.glos.us/static/Buoy_tool/data/meta_english.json');
  }
}
