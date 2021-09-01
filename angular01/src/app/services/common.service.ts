import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public headers =  new HttpHeaders({
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  });

  public userCount$ = new BehaviorSubject<number>(0);
  public maleCount$ = new BehaviorSubject<number>(0);
  public femaleCount$ = new BehaviorSubject<number>(0);
  public people: any;


  constructor(private http:HttpClient) { }

  public getRandomPeople() {
    const count = Math.floor(Math.random()* 20) +5;
    return this.http.get<any>('https://randomuser.me/api/?results=' + count, {
      headers: this.headers
    })
  }
}
