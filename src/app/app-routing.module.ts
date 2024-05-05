import { Routes } from '@angular/router';
import { ToDOComponent } from './to-do/to-do.component';
import { AccountComponent } from './account/account.component';
export const routes: Routes = 
[
    {path:'todo', component: ToDOComponent},
    {path:'account', component: AccountComponent},
];