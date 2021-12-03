// Node modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// Own modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/pages/product-list/product-list.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProductFormComponent } from './components/pages/product-form/product-form.component';
import { FooterComponent } from './components/layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NavbarComponent,
    ProductListItemComponent,
    ProductDetailComponent,
    PageNotFoundComponent,
    CartComponent,
    CartListComponent,
    CartFormComponent,
    LoginComponent,
    CartProductComponent,
    RegisterComponent,
    ProductFormComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
