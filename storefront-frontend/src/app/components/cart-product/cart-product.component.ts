// Node modules
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Models
import { OrderProduct, EMPTY_ORDERPRODUCT } from 'src/app/model/order';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

  @Input() line: OrderProduct;
  @Output() changeQuantity: EventEmitter<OrderProduct>;

  constructor() {
    // Initialization
    this.line = EMPTY_ORDERPRODUCT;
    this.changeQuantity = new EventEmitter;
  }

  ngOnInit(): void {
  }

  onChangeQuantity(e: number) {
    this.changeQuantity.emit(this.line);
  }
}
