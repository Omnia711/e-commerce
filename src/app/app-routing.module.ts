import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { NavBlankLayoutComponent } from './compontents/nav-blank-layout/nav-blank-layout.component';
import { NavAuthLayoutComponent } from './compontents/nav-auth-layout/nav-auth-layout.component';
import { HomeComponent } from './compontents/home/home.component';
import { CartComponent } from './compontents/cart/cart.component';
import { ProductsComponent } from './compontents/products/products.component';
import { DetailsComponent } from './compontents/details/details.component';
import { BrandsComponent } from './compontents/brands/brands.component';
import { CategoriesComponent } from './compontents/categories/categories.component';
import { LoginComponent } from './compontents/login/login.component';
import { RegisterComponent } from './compontents/register/register.component';
import { NotfoundComponent } from './compontents/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { CheckOutComponent } from './compontents/check-out/check-out.component';
import { AllordersComponent } from './compontents/allorders/allorders.component';
import { CategoriesDetailsComponent } from './compontents/categories-details/categories-details.component';
import { WishListComponent } from './compontents/wish-list/wish-list.component';
import { BrandsDetailsComponent } from './compontents/brands-details/brands-details.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: NavBlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      {
        path: 'setting',
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
      },

      { path: 'products', component: ProductsComponent, title: 'Products' },
      { path: 'allorders', component: AllordersComponent, title: 'All Orders' },

      { path: 'checkout/:id', component: CheckOutComponent, title: 'Payment' },

      // {path:'details' , component:DetailsComponent},

      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Producut Details',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },

      {
        path: 'brandsdetails/:id',
        component: BrandsDetailsComponent,
        title: 'Brands Details',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },

      {
        path: 'wishlist',
        component: WishListComponent,
        title: 'Fav Icons',
      },
      {
        path: 'categoriesdetails/:id',
        component: CategoriesDetailsComponent,
        title: 'Categories Details',
      },
    ],
  },

  {
    path: '',
    component: NavAuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'SignUp' },
    ],
  },

  {
    path: 'Setting',
    loadChildren: () =>
      import('./setting/setting.module').then((m) => m.SettingModule),
  },
  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
