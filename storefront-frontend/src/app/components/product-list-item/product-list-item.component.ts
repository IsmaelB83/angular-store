
// Node modules
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Models
import { Product, EMPTY_PRODUCT } from 'src/app/model/product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {

  @Input() quantity: number;
  @Input() addToCart: boolean;
  @Input() product: Product;
  @Output() addToCartEvent: EventEmitter<{product: Product, quantity :number}>;

  constructor() {
    // Initialization
    this.quantity = 0;
    this.addToCart = false;
    this.product = EMPTY_PRODUCT;
    this.addToCartEvent = new EventEmitter;
  }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    this.addToCartEvent.emit({product: this.product, quantity: this.quantity});
  }
}
