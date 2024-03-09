import { Component, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(
    private _EcomdataService: EcomdataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}

  products: Product[] = [];
  searchTerm: string = '';
  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;
  wishListData: string[] = []; //hold data from wishlist

  ngOnInit(): void {
    // get All Products
    this._EcomdataService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response);
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
    });
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        console.log('wish', response);
        const newdata = response.data.map((item: any) => item._id);
        console.log('newdata', newdata);
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
        this._WishlistService.wishnumber.next(response.data.length);
        console.log('numberrr', response.data.length);
      },
    });
  }

  removeFav(productId: any): void {
    this._WishlistService.removeFav(productId).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        this._WishlistService.wishnumber.next(response.data.length);
        console.log('deltnumber', response.data.length);
      },
    });
  }

  pageChanged(event: any): void {
    console.log(event);
    this._EcomdataService.getAllProducts(event).subscribe({
      next: (response) => {
        console.log(response);
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
    });
  }
}
