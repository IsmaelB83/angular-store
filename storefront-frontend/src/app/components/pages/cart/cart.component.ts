// Node modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// Models
import { Order, OrderProduct, EMPTY_ORDER } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { User, EMPTY_USER } from 'src/app/model/user';
// Services
import { NotificationsService } from 'src/app/services/shared/notifications.service';
import { StoreService } from 'src/app/services/shared/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[];
  order: Order;
  user: User;
  fullName: string;
  address: string;
  card: string;

  constructor(
    private storeState: StoreService,
    private notificationsService: NotificationsService) {
      // Initialization
      this.subscriptions = [];
      this.user = EMPTY_USER;
      this.order = EMPTY_ORDER;
      this.fullName = "";
      this.address = "";
      this.card = "";
      // Subscriptions
      this.subscriptions.push(this.storeState.user$.subscribe(user => this.user = user ));
      this.subscriptions.push(this.storeState.order$.subscribe(order => this.order = order ));
      this.subscriptions.push(this.storeState.onCartUpdated$.subscribe(
        _order => this.notificationsService.showSuccess('Cart updated'),
        _error => this.notificationsService.showError('Error updating cart')
      ));
      this.subscriptions.push(this.storeState.onOrderCompleted$.subscribe(order => this.order = order));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  changeOrder(line: OrderProduct): void {
    const product: Product = {
      id: line.productid,
      photo: line.photo,
      name: line.name,
      price: line.price,
      category: ''
    }
    this.storeState.addToCart(product, line.quantity);
  }

  submitOrder(data: {fullName: string, address: string, card: string}) {
    this.fullName = data.fullName;
    this.address = data.address;
    this.card = data.card;
    this.storeState.completeOrder();
  }
}
