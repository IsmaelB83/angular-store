// Node modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// Services
import { StoreService } from 'src/app/services/shared/store.service';
import { NotificationsService } from 'src/app/services/shared/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[];
  email: string;
  password: string;
  loading: boolean;

  constructor(
    private storeState: StoreService,
    private notificationsService: NotificationsService,
    private router: Router) {
      // Initialization
      this.subscriptions = [];
      this.email = "";
      this.password = "";
      this.loading = false;
      // Subscription
      this.subscriptions.push(this.storeState.onLogin$.subscribe(
        _user => {
          this.loading = false;
          this.notificationsService.showSuccess('Login succesfull');
          this.router.navigate(['/']);
        },
        error => {
          this.loading = false;
          this.notificationsService.showError(`${error.status} - ${error.statusText}`);
        }
      ));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  login() {
    this.loading = true;
    this.storeState.login(this.email, this.password)
  }
}
