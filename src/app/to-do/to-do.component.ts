import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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
  constructor(public apiService :ServicesService){}
   todolist: any[] = [] //list for unsaved tasks
   dblist: any[] = [] //list for saved tasks
   ownerdb: any[] = []
   //retrive db data on load
   ngOnInit(): void {
     this.AllData();
     this.Owner();
   }

   //function for hiding/displaying creating task
  showModal = false
  hideTasks = true;
  openModal(){
    this.showModal =true;
    this.showDatainDB =false;
    this.showDatainList = false;
    this.showUpdate = false;
  }
  //close owner form
  closeModal(){
    this.OwnerForm = false
  }
   //function for hiding/displaying div for saving task to db
  showDatainDB = true
  showDBData(){
    this.showDatainDB = true
    this.showDatainList = false;
    this.showModal = false;
    this.showUpdate = false;
  }

   //function for hiding/displaying list of unsaved data
  showDatainList = false
  showListData(){
    this.showDatainList = true
    this.showDatainDB = false;
    this.showModal = false;
    this.showUpdate = false;
  }
   //function for hiding/displaying owner form
  OwnerForm = false;
  showOwnerForm(){
    this.OwnerForm = !this.OwnerForm
  }
   //function for hiding/displaying creating task
  showItems = false;
  ownerItemlist: any[] = []
  selectedOwner = false
  ownerId = '';

  //handles inputs in form
  todo = new FormGroup({
    owner : new FormControl('', Validators.required),
    task : new FormControl('', Validators.required)
  })
  owner = new FormGroup({
    name : new FormControl('', Validators.required)
  })

  hideOnselectOwner = true;
  showOnselectOwner = false;
  ownername = '';
  ownerItemList: any[] = [];
  //function to get owner by id and to show tasks associated with the owner
  getownerId($event: any){
    this.ownerItems();
    const selectedOption = $event.target;
    const selectedid = selectedOption.value;
    this.ownerId = selectedid;
    this.hideOnselectOwner = !this.hideOnselectOwner;
    this.showOnselectOwner = !this.showOnselectOwner;
    const owner = this.ownerdb.find(owner => owner.id === this.ownerId);
    const filteredArray = this.todolist.filter(item => item.owner === this.ownerId);
    this.ownerItemList = filteredArray;
    const ownerName = owner.name;
    this.ownername = ownerName;
  }
 //get item data
  async AllData(): Promise<any>  {
    const response = await this.apiService.GetAllData('todo', 'display');
    this.dblist = response.data;
  }
  //get owner data
  async Owner(): Promise<any>  {
    const response = await this.apiService.GetOwner('owner', 'display');
    this.ownerdb = response.data;
    console.log(this.ownerdb)
  }
  //get all item data that is associated with owner id and push into owneritems
  owneritems: any[] =[]
  async ownerItems(): Promise<any> {
    const response = await this.apiService.GetAllData('todo', 'display');
    const filteredItems = response.data.filter((item:any) => item.owner === this.ownerId);
    this.owneritems = filteredItems;
  }
  //close the dashboard like div and go back to selecting owner
  selectanotherOwner(){
    this.showOnselectOwner = !this.showOnselectOwner;
    this.hideOnselectOwner = !this.hideOnselectOwner;
    this.ownerId = ''
  }
//push item to todolist
  async pushItemtoList() {
    const owner = this.ownerId;
    const task = this.todo.get('task')?.value; 
    const nameStore = {owner, task};
    if (nameStore) { 
      this.todolist.push(nameStore);
      this.todo.setValue({
        owner:'',
        task: ''
      })
      const filteredArray = this.todolist.filter(item => item.owner === this.ownerId);
      this.ownerItemList = filteredArray;
      console.log(this.todolist)
    } else {
      console.log('name is null or empty');
    }
  }
  //push all data in todolist to database
  async pushToDatabase() {
    if (this.ownerItemlist.length === 0) {
      alert('No items to push to database');
      return;
    }
    try {
      const response = await this.apiService.Postlist('todo', 'pushList', this.ownerItemlist);
      console.log(this.ownerItemlist);
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
 //create new list for taking new values of task and owner
 //but the owner value here will be owner id
newList = ({
 Owner : '',
 Task: ''
})
//get new values every input event to be used in updating
onChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.name === 'task') {
    this.newList.Task = input.value;
  }
  console.log('Input value changed:', this.newList);
}
//update item using id
async updateItem(todoid: string) {
  console.log(todoid);
  const selectedTodo = {
    owner: this.ownerId,
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
//delete item by id
async deleteItem(itemid: string) {
  try{
    const deleteItEM = await this.apiService.Delete('todo','delete',itemid)
    console.log(deleteItEM);
    
  }
  catch(error){
    console.error('Error deleting item:', error);
  }
  
}
//create new owner
async createOwner(){
  const name = this.owner.get('name')?.value; 
  const nameStore = {name: name};
  try {
    const response = await this.apiService.PostOwner('owner', 'createowner', nameStore);

    if (response) { 
      console.log('Items pushed successfully');
      

    } else {
      console.error('Error pushing to database:', response);
    }
  } catch (error) {
    console.error('Error pushing to database:', error);
  }

 }
 //new list for getting new values to be used in updating
 newName = ({
  Name : this.ownername
 })
 //update owner
updateOwner(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.name === 'owner') {
    this.newName.Name = input.value;
  }
  console.log('Input value changed:', this.newName);
}
//show UProfile to be able to update
showUpdate = false;
showProfile(){
  this.showUpdate = true;
  this.showModal = false;
  this.showDatainDB =false;
  this.showDatainList = false;

}
//update owner account
 async updateAccount(id: string){
  const theName = ({
    name : this.newName.Name
  })
  try{
    console.log(name);
    const updateitem = await this.apiService.UpdateOwner('owner','update',id,theName);
    console.log(updateitem.data)
    console.log('update sucessful')
    this.ownername = theName.name;
  }
  catch(error){
    console.error('Error updating item:', error);
  }
 }
 //delete tasks associated with ownerid
 async deleteAccItem(ownerid: string){
  try {
    const owneriTEMSdelete = await this.apiService.DeleteOwnerTasks('todo', 'deleteowner', ownerid);
    console.log(owneriTEMSdelete); 
  } catch(error) {
    console.error('Error deleting item:', error);
  }
 }
 //delete owner , call delete task inside so that two process will be done in one function
 async deleteAccount(ownerid: string) {
  try {
    this.deleteAccItem(ownerid);
    const deleteItEM = await this.apiService.DeleteOwner('owner', 'delete', ownerid);
    console.log(deleteItEM); 
  } catch(error) {
    console.error('Error deleting item:', error);
  }
}

}
