// Node modules
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Models
import { User, EMPTY_USER } from 'src/app/model/user';
// Services
import { StoreService } from 'src/app/services/shared/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: User;
  subscriptions: Subscription[];
  @Input() active: string;

  constructor(
    private storeState: StoreService,
    private router: Router) {
      // Initialization
      this.subscriptions = [];
      this.active = "";
      this.user = EMPTY_USER;
      // Subscriptions
      this.subscriptions.push(this.storeState.user$.subscribe(user => this.user = user));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  logout() {
    this.storeState.logout();
    this.router.navigate(['/login']);
  }
}
