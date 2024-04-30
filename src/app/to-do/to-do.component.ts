import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDOComponent {
  showModal = false
  
  openModal(){
    this.showModal =!this.showModal;
  }
}
