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
  //modalshowdhata from db
  showDatainDB = false
  showDBData(){
    this.showDatainDB = !this.showDatainDB
  }
  //modal show data in list
  showDatainList = false
  showListData(){
    this.showDatainList = !this.showDatainList
  }

  constructor(public apiService :ServicesService){}
//formgroup get owner and task put in state
  todo = new FormGroup({
    owner : new FormControl('', Validators.required),
    task : new FormControl('', Validators.required)
  })
  //todolist static,empty when reload
  todolist: any[] = []
  //dblist data from mongodbcompass
  dblist: any[] = []

  //displayalldata
  ngOnInit(): void {
    this.AllData();
  }
  async AllData(): Promise<any>  {
    const response = await this.apiService.GetAllData('todo', 'display');
    this.dblist = response.data;
    console.log(this.dblist);
  }
  //push item to todolist
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

  //push all data in todolist to database
  async pushToDatabase() {
    if (this.todolist.length === 0) {
      console.log('No items to push to database');
      return;
    }
    console.log(this.todolist);
    try {
      const response = await this.apiService.Postlist('todo', 'pushList', this.todolist);
      if (response) { 
        console.log('Items pushed successfully');

      } else {
        console.error('Error pushing to database:', response);
      }
    } catch (error) {
      console.error('Error pushing to database:', error);
    }
  }
//push selected todo to database
 async pushItemtoDatabase(todo: any[]){
  console.log(todo);
  const owner = todo;
  console.log(owner)
  try {
    const response = await this.apiService.PostTodo('todo', 'pushTodo', owner);
    if (response) { 
      console.log('Items pushed successfully');

    } else {
      console.error('Error pushing to database:', response);
    }
  } catch (error) {
    console.error('Error pushing to database:', error);
  }

 }

 //updateselectedtodo
newList = ({
 Owner : '',
 Task: ''
})
onChange(event: Event) {
  const input = event.target as HTMLInputElement;
  //change value based on input name = ""
  if (input.name === 'owner') {
    this.newList.Owner = input.value;
  } else if (input.name === 'task') {
    this.newList.Task = input.value;
  }
  console.log('Input value changed:', this.newList);
}

async updateItem(todoid: string) {
  console.log(todoid);
  const selectedTodo = {
    owner: this.newList.Owner,
    task: this.newList.Task,
  };
  console.log(selectedTodo)
  try{
    const updateitem = await this.apiService.Update('todo','update',todoid,selectedTodo);
  }
  catch(error){
    console.error('Error updating item:', error);
  }

}

//delete by id
async deleteItem(itemid: string) {
  try{
    const deleteItEM = await this.apiService.Delete('todo','delete',itemid)
    console.log(deleteItEM);
    
  }
  catch(error){
    console.error('Error deleting item:', error);
  }
  
}
}
