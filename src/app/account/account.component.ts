import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AccountServices } from 'src/services/account/account-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
constructor(public apiService: AccountServices, public route: Router){}
accountlist: any[] = []
account = new FormGroup({
  username: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
})
async NewAccount(){
  const accountdetails = this.account.value;
    const response = await this.apiService.Create('account','create',accountdetails);
    if (response){
      this.account.setValue({
        username:'',
        password: ''
      })
    console.log(response);
    this.route.navigate(['/todo'])
    }
    else{
      alert("error")
    }
    
}
}
