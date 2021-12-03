// Node imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Models
import { User, EMPTY_USER } from 'src/app/model/user';
// Services
import { NotificationsService } from 'src/app/services/shared/notifications.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  password: string;
  confirmPassword: string;
  loading: boolean;

  constructor(
    private userService: UserService,
    private notificationService: NotificationsService,
    private router: Router) {
      // Initialization
      this.user = EMPTY_USER;
      this.password = "";
      this.confirmPassword = "";
      this.loading = false;
  }

  ngOnInit(): void {
  }

  register() {
    this.loading = true;
    this.userService.register(this.user).toPromise()
    .then(
      data => {
        this.loading = false;
        this.notificationService.showSuccess(`Usuario ${data.email} creado con éxito.`);
        this.router.navigate(['login']);
      },
      error => {
        this.loading = false;
        if (error.error && error.error.detail) {
          this.notificationService.showSuccess(`Error ${error.status} - ${error.error.detail}`);
        } else {
          this.notificationService.showSuccess(`Error ${error.status} - ${error.statusText}`);
        }
      }
    );
  }

}
