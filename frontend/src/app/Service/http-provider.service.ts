import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

const apiUrl = 'http://localhost:3000/api';

const httpLink = {
  getParcels: apiUrl + '/parcels',
  saveParcel: apiUrl + '/parcels',
  getFilteredParcels: apiUrl + '/parcels/filter',
};
@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) {}

  public getParcels(): Observable<any> {
    return this.webApiService.get(httpLink.getParcels);
  }
  public saveParcel(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveParcel, model);
  }
  public getFilteredParcels(model: any): Observable<any> {
    return this.webApiService.post(httpLink.getFilteredParcels, model);
  }
  // public getEmployeeDetailById(model: any): Observable<any> {
  //   return this.webApiService.get(httpLink.getEmployeeDetailById + '?employeeId=' + model);
  // }
}
