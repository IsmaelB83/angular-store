// Node modules
import { Component, OnInit } from '@angular/core';
// Models
import { Order, EMPTY_ORDER } from 'src/app/model/order';
import { User, EMPTY_USER } from 'src/app/model/user';
import { Product } from 'src/app/model/product';
// Services
import { NotificationsService } from 'src/app/services/shared/notifications.service';
import { ProductService } from 'src/app/services/api/product.service';
import { StoreService } from 'src/app/services/shared/store.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  subscriptions: Subscription[];
  user: User;
  order: Order;
  products: Product[];

  constructor(
    private productService: ProductService,
    private storeState: StoreService,
    private notificationsService: NotificationsService) {
      // Initialization
      this.subscriptions = [];
      this.order = EMPTY_ORDER;
      this.user = EMPTY_USER;
      this.products = [];
      // Subscriptions
      this.subscriptions.push(this.storeState.order$.subscribe(order => this.order = order));
      this.subscriptions.push(this.storeState.user$.subscribe(user => this.user = user));
      this.subscriptions.push(this.storeState.onCartUpdated$.subscribe(
        _order => this.notificationsService.showSuccess('Cart updated'),
        _error => this.notificationsService.showError('Error updating cart')
      ));
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  addToCart(product: {product: Product, quantity: number}): void {
    this.storeState.addToCart(product.product, product.quantity);
  }

  getProductQuantity(id: number): number {
    const product = this.order.lines.find(p => p.productid === id);
    return product?product.quantity:0;
  }
}
