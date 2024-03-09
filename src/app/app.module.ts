import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './compontents/home/home.component';
import { CartComponent } from './compontents/cart/cart.component';
import { DetailsComponent } from './compontents/details/details.component';
import { ProductsComponent } from './compontents/products/products.component';
import { FooterComponent } from './compontents/footer/footer.component';
import { NotfoundComponent } from './compontents/notfound/notfound.component';
import { BrandsComponent } from './compontents/brands/brands.component';
import { CategoriesComponent } from './compontents/categories/categories.component';
import { LoginComponent } from './compontents/login/login.component';
import { RegisterComponent } from './compontents/register/register.component';
import { NavBlankComponent } from './compontents/nav-blank/nav-blank.component';
import { NavAuthComponent } from './compontents/nav-auth/nav-auth.component';
import { NavAuthLayoutComponent } from './compontents/nav-auth-layout/nav-auth-layout.component';
import { NavBlankLayoutComponent } from './compontents/nav-blank-layout/nav-blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { BuyPipe } from './core/buy.pipe';
import { TermPipe } from './core/term.pipe';
import { SearchPipe } from './core/search.pipe';
import { CheckOutComponent } from './compontents/check-out/check-out.component';
import { AllordersComponent } from './compontents/allorders/allorders.component';
import { MyHttpInterceptor } from './my-http.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/loading.interceptor';
import { CategoriesDetailsComponent } from './compontents/categories-details/categories-details.component';
import { WishListComponent } from './compontents/wish-list/wish-list.component';
import { BrandsDetailsComponent } from './compontents/brands-details/brands-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    DetailsComponent,
    ProductsComponent,
    FooterComponent,
    NotfoundComponent,
    BrandsComponent,
    CategoriesComponent,
    LoginComponent,
    RegisterComponent,
    NavBlankComponent,
    NavAuthComponent,
    NavAuthLayoutComponent,
    NavBlankLayoutComponent,
    BuyPipe,
    TermPipe,
    SearchPipe,
    CheckOutComponent,
    AllordersComponent,
    CategoriesDetailsComponent,
    WishListComponent,
    BrandsDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
