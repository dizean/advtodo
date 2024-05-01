import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  //get all data from db
  GetAllData(module:string, action: string){
    return axios.get(`http://localhost:8080/${module}/${action}`)
  }
  //push all data in list array to db
  async Postlist(module: string, action: string, list: any[]) {
    const newList = list.map(item => ({ owner: item.task, task: item.owner }));
    return axios.post(`http://localhost:8080/${module}/${action}`, newList);
  }

  //push only selected data in the array to db
  async PostTodo(module: string, action: string, list: any[]) {
    return axios.post(`http://localhost:8080/${module}/${action}`, list);
  }
  //update selected todo
  async Update(module:string, action:string, todoid:any, selectedTodo: {}){
    console.log(selectedTodo)
    return axios.put(`http://localhost:8080/${module}/${action}/${todoid}`,selectedTodo)
  }
  //delete by id
  async Delete(module:string, action:string, todoid:any){
    return axios.delete(`http://localhost:8080/${module}/${action}/${todoid}`)
  }
}
