// Node Modules
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
// Models
// Services
import { NotificationsService } from 'src/app/services/shared/notifications.service';
import { StoreService } from 'src/app/services/shared/store.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})
export class CartFormComponent implements OnInit {

  fullName: string;
  address: string;
  card: string;
  @Input() active: boolean;
  @Output() submitOrder: EventEmitter<{fullName: string, address: string, card: string}>;

  constructor(
    private notificationsService: NotificationsService
  ) {
      // Initialization
      this.active = false;
      this.fullName = "";
      this.address = "";
      this.card = "";
      this.submitOrder = new EventEmitter;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.fullName || !this.address || !this.card) {
      this.notificationsService.showError('Fill all the required data');
    } else {
      this.submitOrder.emit({fullName: this.fullName, address: this.address, card: this.card});
    }
  }
}
