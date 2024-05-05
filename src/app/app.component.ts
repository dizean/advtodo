import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToDOComponent } from './to-do/to-do.component';
import { AccountComponent } from './account/account.component';
@Component({ 
  selector: 'app-root', 
  standalone: true, 
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    HttpClientModule,
    ToDOComponent,
  AccountComponent], 
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css'
})

export class AppComponent { 
  title = 'angular-test';
}