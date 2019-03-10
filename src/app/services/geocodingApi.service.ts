import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodingApiService {
  API_KEY: string;
  API_URL: string;
  constructor(private http: HttpClient) {
    // https://console.developers.google.com/apis/library/geocoding-backend.googleapis.com
    this.API_KEY = 'AIzaSyDADHngy9TO3bPpuXsnQ8Los5fNNq5Wphw';
    this.API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&address=`;
  }

  // tslint:disable-next-line:max-line-length
  findFromAddress(address: string, postalCode?: string, place?: string, province?: string, region?: string, country?: string): Observable<any> {
    const compositeAddress = [address];

    if (postalCode) { compositeAddress.push(postalCode); }
    if (place) { compositeAddress.push(place); }
    if (province) { compositeAddress.push(province); }
    if (region) { compositeAddress.push(region); }
    if (country) { compositeAddress.push(country); }

    const url = `${this.API_URL}${compositeAddress.join(',')}`;

    return this.http.get(url).pipe(
      map(response => <any> response)
    );
  }


}
