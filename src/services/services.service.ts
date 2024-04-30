import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  Get(module:string){
    return axios.get(`http://localhost:8080/${module}`)
  }
  async Post(module: string, action: string, list: any[]) {
    console.log('listapi');
    console.log(list );
    console.log('listapi');
    const newList = list.map(item => ({ owner: item.task, task: item.owner }));
    console.log('listapi');
    console.log(newList );
    console.log('listapi');
    return axios.post(`http://localhost:8080/${module}/${action}`, newList);
  }
}
