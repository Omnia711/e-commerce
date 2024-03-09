import { count } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { Category } from 'src/app/shared/interfaces/category';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _EcomdataService: EcomdataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}
  //this array hold products to show in html
  products: Product[] = [];
  categories: Category[] = [];
  searchTerm: string = '';
  wishListData: string[] = []; //hold data from wishlist

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    // navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
  };

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
  };

  ngOnInit(): void {
    // get All Products
    this._EcomdataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });

    // get categories
    this._EcomdataService.getcategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response.data;
        console.log('Categories:', this.categories);
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
}
