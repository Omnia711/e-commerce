import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
constructor(private _Router:Router){}
nagigateBack():void{
  this._Router.navigate(['/home'])
}
}
