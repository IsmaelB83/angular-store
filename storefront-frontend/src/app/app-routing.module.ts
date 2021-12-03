// Node modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Own modules
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';
import { ProductListComponent } from './components/pages/product-list/product-list.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProductFormComponent } from './components/pages/product-form/product-form.component';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: ProductListComponent, pathMatch: "full" },
  { path: 'login', component: LoginComponent, pathMatch: "full" },
  { path: 'register', component: RegisterComponent, pathMatch: "full" },
  { path: 'products/new', component: ProductFormComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductDetailComponent, pathMatch: "full" },
  { path: 'cart', component: CartComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
