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
   todolist: any[] = []
   dblist: any[] = []
   ownerlist: any[] = []
   ownerdb: any[] = []
   ngOnInit(): void {
     this.AllData();
     this.Owner();
   }
  showModal = false
  hideTasks = true;
  openModal(){
    this.showModal =true;
    this.showDatainDB =false;
    this.showDatainList = false;
    this.showUpdate = false;
  }
  closeModal(){
    this.OwnerForm = false
  }
  showDatainDB = true
  showDBData(){
    this.showDatainDB = true
    this.showDatainList = false;
    this.showModal = false;
    this.showUpdate = false;
  }
  showDatainList = false
  showListData(){
    this.showDatainList = true
    this.showDatainDB = false;
    this.showModal = false;
    this.showUpdate = false;
  }
  OwnerForm = false;
  showOwnerForm(){
    this.OwnerForm = !this.OwnerForm
  }
  ownerList = false
  showOwnerlist(){
    this.ownerList = !this.ownerList
  }
  showOwner = false;
  showOwners(){
    this.showOwner = !this.showOwner
  }
  showItems = false;
  ownerItemlist: any[] = []
  selectedOwner = false
  ownerId = '';
  showTaskofOwner(id: string){
    this.ownerId = id;
    this.selectedOwner = !this.selectedOwner
    console.log(this.owneritems)
    this.ownerItems();
  }
  showUserTask(id: string){
    this.ownerId = id;
    this.showItems = !this.showItems
  }
  todo = new FormGroup({
    owner : new FormControl('', Validators.required),
    task : new FormControl('', Validators.required)
  })

  owner = new FormGroup({
    name : new FormControl('', Validators.required)
  })
  hideOnselectOwner = true;
  showOnselectOwner = false;
  showDashowner = false
  ownername = '';
  ownerItemList: any[] = [];
  getownerId($event: any){
    this.ownerItems();
    console.log('selection changed');
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
    console.log(this.ownername);
    console.log(this.ownerId);
    this.showDashowner = !this.showDashowner;
    console.log(this.owneritems)
  }
 
  async AllData(): Promise<any>  {
    const response = await this.apiService.GetAllData('todo', 'display');
    this.dblist = response.data;
  }
  
  async Owner(): Promise<any>  {
    const response = await this.apiService.GetOwner('owner', 'display');
    this.ownerdb = response.data;
    console.log(this.ownerdb)
  }
  owneritems: any[] =[]
  async ownerItems(): Promise<any> {
    const response = await this.apiService.GetAllData('todo', 'display');
    const filteredItems = response.data.filter((item:any) => item.owner === this.ownerId);
    this.owneritems = filteredItems;
  }

  async getOwnerName() {
    try {
      if (!this.ownerId) {
        throw new Error('ownerId cannot be empty');
      }
      const response = await this.apiService.GetOwner('owner', 'display');
      const owner = this.dblist.find((owner:any) => owner.id === this.ownerId);
      if (!owner) {
        console.warn(`Owner with ID "${this.ownerId}" not found`);
        return;
      }
      const ownerName = owner.name; 
      this.ownername = ownerName;
      console.log(`Owner name retrieved: ${ownerName}`);
    } catch (error) {
      console.error('Error retrieving owner name:', error);
    }
  }
 

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
  async pushOwnertoList() {
    const owner = this.owner.get('name')?.value; 
    const user = {owner};
    if (owner) { 
      this.ownerlist.push(user);
      this.owner.setValue({
        name:''
      })
      this.showModal = false;
      console.log(this.ownerlist);
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
newList = ({
 Owner : '',
 Task: ''
})
onChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.name === 'task') {
    this.newList.Task = input.value;
  }
  console.log('Input value changed:', this.newList);
}

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
async deleteItem(itemid: string) {
  try{
    const deleteItEM = await this.apiService.Delete('todo','delete',itemid)
    console.log(deleteItEM);
    
  }
  catch(error){
    console.error('Error deleting item:', error);
  }
  
}
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
 newName = ({
  Name : this.ownername
 })
updateOwner(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.name === 'owner') {
    this.newName.Name = input.value;
  }
  console.log('Input value changed:', this.newName);
}
showUpdate = false;
showProfile(){
  this.showUpdate = true;
  this.showModal = false;
  this.showDatainDB =false;
  this.showDatainList = false;

}
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
 async deleteAccItem(ownerid: string){
  try {
    const owneriTEMSdelete = await this.apiService.DeleteOwnerTasks('todo', 'deleteowner', ownerid);
    console.log(owneriTEMSdelete); 
  } catch(error) {
    console.error('Error deleting item:', error);
  }
 }
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
