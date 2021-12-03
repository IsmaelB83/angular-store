// Node modules
import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Models
// Services
import { LocalStorageService } from './services/shared/local-storage.service';
import { NotificationsService } from './services/shared/notifications.service';
import { StoreService } from './services/shared/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myStore';

  constructor(
    private storeService: StoreService,
    private localStorage: LocalStorageService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
    const user = this.localStorage.readLocalStorage();
    if (user) {
      try {
        this.storeService.loginWithJwt(user);
        this.notificationsService.showSuccess('Authenticated from local storage');
        this.router.navigate(['/']);
      } catch (error) {
        this.notificationsService.showError(`Error authenticating from LocalStorage ${error}`);

      }
    }
  }
}
