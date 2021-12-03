// Node modules
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
// Own modules
import { EMPTY_USER, User } from 'src/app/model/user';
import { UserService } from 'src/app/services/api/user.service';
import { StoreService } from 'src/app/services/shared/store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  helper: JwtHelperService;

  constructor(
    private storeState: StoreService,
    private userService: UserService) {
      // Initialize properties
      this.user = EMPTY_USER;
      this.helper = new JwtHelperService();
      // Subscriptions
      this.storeState.user$.subscribe(user => {
        this.user = user;
      });
  }

  public isAuthenticated(): boolean {
    return !this.helper.isTokenExpired(this.user.jwt);
  }
}
