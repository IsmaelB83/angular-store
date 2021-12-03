// Node modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Models
import { Product, EMPTY_PRODUCT } from 'src/app/model/product';
import { User, EMPTY_USER } from 'src/app/model/user';
// Services
import { NotificationsService } from 'src/app/services/shared/notifications.service';
import { ProductService } from 'src/app/services/api/product.service';
import { StoreService } from 'src/app/services/shared/store.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[];
  product: Product;
  loading: boolean;
  user: User;

  constructor(
    private productService: ProductService,
    private storeState: StoreService,
    private notificationsService: NotificationsService,
    private router: Router) {
      // Initialization
      this.loading = false;
      this.subscriptions = [];
      this.user = EMPTY_USER;
      this.product = EMPTY_PRODUCT;
      // Subscriptions
      this.subscriptions.push(this.storeState.user$.subscribe(user => this.user = user));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  onSubmit(): void {
    if (!this.product.name || !this.product.category || !this.product.photo || !this.product.price) {
      return this.notificationsService.showError('Fill all the required fields');
    }
    this.loading = true;
    this.productService.addProduct(this.user.jwt, this.product).subscribe(
      producto => {
        this.loading = false;
        this.notificationsService.showSuccess(`Producto ${producto.name} creado`)
        this.router.navigate(['']);
      },
      error => {
        this.loading = false;
        this.notificationsService.showError(`Error while creating product ${error.error}`);
        console.log(error);
      }
    );
  }
}
