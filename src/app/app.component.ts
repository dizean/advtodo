import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({ 
  selector: 'app-root', 
  standalone: true, 
  imports: [RouterOutlet,ReactiveFormsModule,HttpClientModule], 
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css'
})

export class AppComponent { 
  title = 'angular-test';
}