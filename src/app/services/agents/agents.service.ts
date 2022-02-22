import { Injectable } from '@angular/core';
import { ConfigService } from '../config-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  readonly URL_API = this.config.getConfig().backend.url

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  getAgent (params: any) {
    const { name, document, phone, id } = params
        let searchParams: string = ''
        if (name) {
            searchParams += `name=${name}&`
        }
        if (document) {
            searchParams += `document=${document}&`
        }
        if (phone) {
            searchParams += `phone=${phone}&`
        }
        if (id) {
            searchParams = `id=${id}&`
        }
        searchParams = searchParams.slice(0, -1)
    return this.http.get(`${this.URL_API}/api/agents/search/?${searchParams}`)
  }
  login (user: string, password: string) {
    const data = {
      "document": user,
      "password": password
    }
    return this.http.post(`${this.URL_API}/api/agents/login`, data)
  }
}
