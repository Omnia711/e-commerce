import { Subcategory } from './../../shared/interfaces/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}

  cartDetails: any = null;

  removeItem(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.removeItem(id).subscribe({
      next: (response) => {
        console.log(response);
        this.cartDetails = response.data;
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  clearCart(): void {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        if (response.message === 'success') {
          this.cartDetails = null;
          this._CartService.cartNumber.next(0);
          console.log(response);
        }
      },
    });
  }

  updateCount(id: string, count: number): void {
    if (count > 0) {
      this._CartService.updateProduct(id, count).subscribe({
        next: (response) => {
          console.log(response.data);
          this.cartDetails = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        console.log(response.data);
        this.cartDetails = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
