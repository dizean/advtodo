import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  Get(module:string){
    return axios.get(`http://localhost:8080/${module}`)
  }
  Post(module:string, name:any){
    return axios.post(`http://localhost:8080/${module}`)
  }
}
