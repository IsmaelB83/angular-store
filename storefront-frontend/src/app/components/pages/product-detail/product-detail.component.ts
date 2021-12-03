// Node modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';
// Models
import { User, EMPTY_USER } from 'src/app/model/user';
import { Order, EMPTY_ORDER } from 'src/app/model/order';
import { Product, EMPTY_PRODUCT } from 'src/app/model/product';
// Services
import { StoreService } from 'src/app/services/shared/store.service';
import { ProductService } from 'src/app/services/api/product.service';
import { NotificationsService } from 'src/app/services/shared/notifications.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[];
  user: User;
  order: Order;
  product: Product;
  quantity: number;

  constructor(
    private activatedroute:ActivatedRoute,
    private productService: ProductService,
    private storeState: StoreService,
    private notificationsService: NotificationsService) {
      // Initialization
      this.subscriptions = [];
      this.user = EMPTY_USER;
      this.order = EMPTY_ORDER;
      this.product = EMPTY_PRODUCT;
      this.quantity = 1;
      // Subscriptions
      this.subscriptions.push(this.storeState.user$.subscribe(user => this.user = user));
      this.subscriptions.push(this.storeState.onCartUpdated$.subscribe(
        _order => this.notificationsService.showSuccess('Cart updated'),
        _error => this.notificationsService.showError('Error updating cart')
      ));
      this.subscriptions.push(this.storeState.order$.subscribe(order => this.order = order));
  }

  ngOnInit(): void {
    const aux = this.activatedroute.snapshot.paramMap.get("id");
    if (aux) {
      this.productService.getProduct(parseInt(aux)).subscribe(res => {
        this.product = res;
        const prod = this.order.lines.find(p => p.productid === this.product.id);
        this.quantity = prod?prod.quantity:0;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  onAddToCart(): void {
    this.storeState.addToCart(this.product, this.quantity);
  }
}
