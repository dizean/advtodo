import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class AccountServices {
  async Create(module: string, action: string, account: {}) {
    return axios.post(`http://localhost:8080/${module}/${action}`, account);
  }
}
