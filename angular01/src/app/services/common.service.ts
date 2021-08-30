import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public headers =  new HttpHeaders({
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  });

  constructor(private http:HttpClient) { }

  public getRandomPeople() {
    return this.http.get<any>('https://randomuser.me/api/?results=10', {
      headers: this.headers
    })
  }
}
