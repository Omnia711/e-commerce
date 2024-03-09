import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}

  checkout: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [''],
    city: [''],
  });

  cartId: any = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        console.log(params.get('id'));
        this.cartId = params.get('id');
      },
    });
  }

  handelform(): void {
    console.log(this.checkout.value);
    this._CartService.checkout(this.cartId, this.checkout.value).subscribe({
      next: (response) => {
        console.log(response);

        if (response.status == 'success') {
          window.open(response.session.url, '_self');
        }
      },
    });
  }
}
