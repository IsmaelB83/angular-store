// Node modules
import { Injectable } from '@angular/core';
// Own modules
import { EMPTY_USER, User } from 'src/app/model/user';
import { UserService } from 'src/app/services/api/user.service';
import { StoreService } from 'src/app/services/shared/store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    private storeState: StoreService,
    private userService: UserService) {
      // Initialize properties
      this.user = EMPTY_USER;
      // Subscriptions
      this.storeState.user$.subscribe(user => {
        this.user = user;
      });
  }

  public isAuthenticated(): boolean {

    const expiry = JSON.parse(atob(this.user.jwt.split('.')[1])).iat;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
