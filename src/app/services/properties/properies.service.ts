import { Injectable } from '@angular/core';
import { ConfigService } from '../config-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProperiesService {

  readonly URL_API = this.config.getConfig().backend.url

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  createProperty (body: any) {
    return this.http.post(`${this.URL_API}/api/properties/create`, body)
  }

  updateProperty (body: any) {
    return this.http.put(`${this.URL_API}/api/properties/update-property`, body)
  }

  getTop3 () {
    return this.http.get(`${this.URL_API}/api/properties/top3`)
  }

  getProperties () {
    return this.http.get(`${this.URL_API}/api/properties`)
  }

  getLocations () {
    return this.http.get(`${this.URL_API}/api/properties/locations`)
  }

  increaseVisits (id: string) {
    return this.http.put(`${this.URL_API}/api/properties/increase-visit`, { _id: id })
  }
  
  getPropertyByParams (params: any) {
    return this.http.get(`${this.URL_API}/api/properties/search?${params}`)
  }

  deleteProperty (id:string) {
    return this.http.delete(`${this.URL_API}/api/properties/delete-property/${id}`)
  }
}
