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
    const newList = list.map(item => ({ owner: item.owner, task: item.task }));
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

  async PostOwner(module: string, action: string, name: any) {
    return axios.post(`http://localhost:8080/${module}/${action}`, name);
  }
  async UpdateOwner(module: string, action: string, ownerid: any, name: {}) {
    return axios.put(`http://localhost:8080/${module}/${action}/${ownerid}`, name);
  }

  async DeleteOwner(module:string, action:string, todoid:any){
    return axios.delete(`http://localhost:8080/${module}/${action}/${todoid}`)
  }
  async DeleteOwnerTasks(module:string, action:string, ownerId:any){
    return axios.delete(`http://localhost:8080/${module}/${action}/${ownerId}`)
  }
  GetOwner(module:string, action: string){
    return axios.get(`http://localhost:8080/${module}/${action}`)
  }
}
