import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){}
msError:string='';
isloading:boolean= false;
  // form group create object and form control create property
registerform:FormGroup= new FormGroup({ 
  name:new FormControl('', [Validators .required, Validators.minLength(3), Validators.maxLength(20)]),
  email: new FormControl('' ,[Validators.required, Validators.email ]),
  password: new FormControl('', [Validators .required, Validators.pattern(/^\w{6,20}$/)]),
  rePassword: new FormControl(''),
  phone: new FormControl('', [Validators .required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
}  ,    {   validators: [ this.confirmPassword]  } as FormControlOptions );


confirmPassword(group:FormGroup):void{

  const password= group.get('password');
  const rePassword= group.get('rePassword');

  if(rePassword?.value == ''){
    rePassword?.setErrors({required:true})

  }

  else if(password?.value != rePassword?.value){
    rePassword?.setErrors({mismatch:true})
  }

}

handleForm(): void {
if(this.registerform.valid){
  this.isloading=true; //to show spinner
  this._AuthService.setRegister(this.registerform.value).subscribe({
    next:(response: any) => {
      // console.log(response)
      if(response.message =='success'){ 
        this.isloading=false; 
        //router== class in ts make dynamic routing 
        //navigate== make the user go to login
        this._Router.navigate(['/login']) 
      }    
    },
    error:(err:HttpErrorResponse) => {
      // console.log(err)
      this.isloading=false; 
      this.msError= (err.error.message)
      // console.log(err.error.message);
    }
});
}
}

}
