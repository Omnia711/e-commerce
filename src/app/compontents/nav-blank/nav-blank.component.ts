import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { count } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}

  @ViewChild('NAV') NavScroll!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 300) {
      this._Renderer2.addClass(this.NavScroll.nativeElement, 'px-5');
      this._Renderer2.addClass(this.NavScroll.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.NavScroll.nativeElement, 'px-5');
      this._Renderer2.removeClass(this.NavScroll.nativeElement, 'shadow');
    }
  }
  cartNum: number = 0;
  wishnum: number = 0;

  ngOnInit(): void {
    this._WishlistService.wishnumber.subscribe({
      next: (data) => {
        console.log('wishnumber', data);
        this.wishnum = data;
      },
    });

    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        console.log(response, 'omniamahmoud');
        this.wishnum = response.count;
      },
    });

    this._CartService.cartNumber.subscribe({
      next: (data) => {
        console.log('cartnumber', data);
        this.cartNum = data;
        //       // this.wishnum = this._WishlistService.getWishList().subscribe({
        //       //   next: (response: any) => {
        //       //     this.wishnum = response.count;
        //       //   },
        //       // });
      },
    });
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        console.log('nav', response);
        this.cartNum = response.numOfCartItems;
      },
    });
  }

  logOutUser(): void {
    this._AuthService.logOutUser();
  }
}
