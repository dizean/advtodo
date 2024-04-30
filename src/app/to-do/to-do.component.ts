import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, FormControl, ReactiveFormsModule, FormGroup,FormArray } from '@angular/forms';
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
  showList (){
    console.log(this.todolist);
  }
  async pushToDatabase() {
    if (this.todolist.length === 0) {
      console.log('No items to push to database');
      return;
    }
    console.log(this.todolist);
    const newList = this.todolist.map(item => ({ owner: item.task, task: item.owner }));
    try {
      const response = await this.apiService.Post('todo', 'create', newList);
      if (response) { 
        console.log('Items pushed successfully');

      } else {
        console.error('Error pushing to database:', response);
      }
    } catch (error) {
      console.error('Error pushing to database:', error);
    }
  }

  
}
