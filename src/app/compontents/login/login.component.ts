import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService, private _Router:Router, private _FormBuilder:FormBuilder){}
msError:string='';
isloading:boolean= false;
  // form group create object and form control create property
// loginform:FormGroup= new FormGroup({ 
//   email: new FormControl('' ,[Validators.required, Validators.email ]),
//   password: new FormControl('', [Validators .required, Validators.pattern(/^\w{6,20}$/)]),

// });
//نقس الكومن ال فوق بس اسهل في الكتابه
loginform:FormGroup= this._FormBuilder.group( {
  email:[null, [Validators.required, Validators.email ]],
  password:[null, [Validators .required, Validators.pattern(/^\w{6,20}$/)]]
} )

handleForm(): void {
if(this.loginform.valid){
  this.isloading=true; //to show spinner
  this._AuthService.setLogin(this.loginform.value).subscribe({
    next:(response: any) => {
      // console.log(response)
      if(response.message =='success'){ 
       localStorage.setItem('eToken' , response.token);
       this._AuthService.saveUserData;
        this._Router.navigate(['/home']) 
        this.isloading=false; 

      }    
    },
    error:(err:HttpErrorResponse) => {
      // console.log(err)
      this.isloading=false; 
      this.msError=err.error.message
      // console.log(err.error.message);
    }
});
}
else{this.loginform.markAllAsTouched()}
}

}
