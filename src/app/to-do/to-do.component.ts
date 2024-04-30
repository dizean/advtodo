import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ServicesService } from 'src/services/services.service';

@Component({
  selector: 'todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDOComponent {
  //modal for adding Tasks
  showModal = false
  openModal(){
    this.showModal =!this.showModal;
  }

  constructor(public apiService :ServicesService){}

  todo = new FormGroup({
    owner : new FormControl('', Validators.required),
    task : new FormControl('', Validators.required)
  })

  todolist: any[] = []

  async pushItemtoList() {
    const owner = this.todo.get('owner')?.value; 
    const task = this.todo.get('task')?.value; 
    const nameStore = {owner, task};
    if (nameStore) { 
      this.todolist.push(nameStore);
      this.todo.setValue({
        owner:'',
        task: ''
      })
      this.showModal = false;
    } else {
      console.log('name is null or empty');
    }
  }
  async pushtoDatabase() {
    if (this.todolist) { 
      const response = await this.apiService.Post('item', this.todolist);
      this.showModal = false;
    } else {
      console.log('name is null or empty');
    }
  }
}
