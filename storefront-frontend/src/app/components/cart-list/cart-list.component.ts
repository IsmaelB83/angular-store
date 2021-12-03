// Node modules
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Models
import { Order, OrderProduct, EMPTY_ORDER } from 'src/app/model/order';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  @Input() order: Order;
  @Output() changeOrder: EventEmitter<OrderProduct>;

  constructor() {
    // Initialization
    this.order = EMPTY_ORDER;
    this.changeOrder = new EventEmitter;
  }

  ngOnInit(): void {
  }

  changeQuantity(orderProduct: OrderProduct): void {
    this.changeOrder.emit(orderProduct);
  }
}
