import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _CartService: CartService
  ) {}
  products: Product[] = [];

  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        console.log(response);
        this.products = response.data;
        const newdata = response.data.map((item: any) => item._id);
        // console.log('newdata', newdata);
        this.wishListData = newdata;
      },
    });
  }

  addProduct(id: any, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }
  addToWishList(productId: string): void {
    this._WishlistService.addToWishList(productId).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
      },
    });
  }
  wishListData: string[] = []; //hold data from wishlist

  removeFav(productId: any): void {
    this._WishlistService.removeFav(productId).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        this._WishlistService.wishnumber.next(response.data.length);
        console.log('deltnumber', response.data.length);

        const newFavs = this.products.filter((item: any) =>
          this.wishListData.includes(item._id)
        );
        this.products = newFavs;
      },
    });
  }
}
