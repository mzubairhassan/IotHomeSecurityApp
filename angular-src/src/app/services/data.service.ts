import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SensordataService {

  authToken: any;
  private url = 'http://localhost:3000';  
  private socket;

  constructor(

    private http: Http,
    private authService: AuthService

  ) {
    this.authService.loadToken();
    this.authToken = this.authService.authToken;
   }

  addSensorValues(values) {

    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', this.authToken);
    return this.http.post('sensors/addValues', values, { headers: header })
      .map(res => res.json());
  }


  addThresholdValues(values){

    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', this.authToken);
    return this.http.post('thresholds/addValues', values, {headers: header})
    .map(res => res.json());

  }

  getThresholdValues(){
    let header = new Headers();
    header.append('Authorization', this.authToken);
    return this.http.get('thresholds/getValues',{headers: header})
    .map(res => res.json());

  }

  sendMessage(message){
    // this.socket = io(this.url);
    // console.log("1");
    // this.socket.emit('add-message', message);    
    console.log("2");
  }

  getValues() {
    console.log("3");
    let observable = new Observable(observer => {
      console.log("4");
      this.socket = io();
      console.log("5");
      this.socket.on('data', (data) => {
        console.log(data);
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  } 

  getValuesPerLimit(limit){
    let header = new Headers();
    var values = {limit: limit};
    header.append('Content-Type', 'application/json');
    header.append('Authorization', this.authToken);
    return this.http.post('sensors/getValuesPerLimit',
     values, {headers: header})
    .map(res => res.json());
  }

}
