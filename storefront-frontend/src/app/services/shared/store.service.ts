// Node imports
import { Injectable } from '@angular/core';
import { State } from './state';
import { Observable, Subject } from 'rxjs';
// Models
import { Order, EMPTY_ORDER } from 'src/app/model/order';
import { User, EMPTY_USER } from 'src/app/model/user';
import { Product } from 'src/app/model/product';
import { Store } from 'src/app/model/store';
// Services
import { LocalStorageService } from 'src/app/services/shared/local-storage.service';
import { OrderService } from 'src/app/services/api/order.service';
import { UserService } from '../api/user.service';

const initialState: Store = {
  user: EMPTY_USER,
  order: EMPTY_ORDER
};

@Injectable({
  providedIn: 'root',
})
export class StoreService extends State<Store> {

  user$: Observable<User> = this.select(state => (state.user));
  order$: Observable<Order> = this.select(state => (state.order));

  onLogin$: Subject<User> = new Subject();
  onCartUpdated$: Subject<Order> = new Subject();
  onOrderCompleted$: Subject<Order> = new Subject();
  onOrderCreated$: Subject<Order> = new Subject();

  constructor(
    private localStorageService: LocalStorageService,
    private orderService: OrderService,
    private userService: UserService) {
      // Initialization
      super(initialState);
  }

  login (email: string, password: string): void {
    this.userService.login(email, password).toPromise()
    .then(user => {
      this.setState({ user, order: initialState.order });
      this.onLogin$.next(this.state.user);
      this.localStorageService.saveLocalStorage(this.state.user);
      this.orderService.getActiveOrder(this.state.user.id, this.state.user.jwt).toPromise()
      .then(order => {
          if (!order) {
            this.orderService.createOrder(this.state.user.id, this.state.user.jwt).toPromise()
            .then(order => {
              order.totalPrice = 0;
              this.setState({ user, order });
              this.onOrderCreated$.next(this.state.order);
            })
          } else {
            order.totalPrice = 0;
            order.lines.forEach(product => order.totalPrice += product.price * product.quantity)
            order.lines.sort(((a, b) => (a.id - b.id)));
            this.setState({ user, order });
          }
      })
    })
    .catch(error => this.onLogin$.error(error));
  }

  loginWithJwt (user: User): void {
    this.setState({ user, order: initialState.order });
    this.onLogin$.next(this.state.user);
    this.orderService.getActiveOrder(this.state.user.id, this.state.user.jwt).toPromise()
    .then(
      order => {
        if (!order) {
          this.orderService.createOrder(this.state.user.id, this.state.user.jwt).toPromise()
          .then(order => {
            order.totalPrice = 0;
            this.setState({ user, order });
            this.onOrderCreated$.next(this.state.order);
          })
        } else {
          order.totalPrice = 0;
          order.lines.forEach(product => order.totalPrice += product.price * product.quantity)
          order.lines.sort(((a, b) => (a.id - b.id)));
          this.setState({ user, order });
        }
      },
      _error => {
        this.localStorageService.cleanLocalStorage();
        throw('WRONG JWT');
      }
    )
  }

  logout () {
    this.setState(initialState)
    this.localStorageService.cleanLocalStorage();
  }

  addToCart(product: Product, quantity: number): void {
    if (this.state.order.id !== 0 && this.state.order.status === "active") {
      this.orderService.updateOrder(this.state.user.id, this.state.user.jwt, this.state.order.id, product.id, quantity).toPromise()
      .then (order => {
          order.totalPrice = 0;
          order.lines.forEach(product => order.totalPrice += product.quantity * product.price);
          order.lines.sort(((a, b) => (a.id - b.id)));
          this.setState({ user: this.state.user, order })
          this.onCartUpdated$.next(order);
      })
      .catch(error => this.onCartUpdated$.error(error));
    } else {
      this.orderService.createOrder(this.state.user.id, this.state.user.jwt).toPromise()
      .then(order => {
        this.orderService.updateOrder(this.state.user.id, this.state.user.jwt, order.id, product.id, quantity).toPromise()
        .then(order => {
          order.totalPrice = product.price * quantity;
          this.setState({ user: this.state.user, order })
          this.onCartUpdated$.next(order);
        })
        .catch(error => this.onCartUpdated$.error(error))
      })
    }
  }

  completeOrder() {
    this.orderService.completeOrder(this.state.user.id, this.state.user.jwt, this.state.order.id).toPromise()
    .then(order => {
      const newOrder = this.state.order;
      newOrder.status = "complete";
      this.setState({
        user: this.state.user,
        order: newOrder
      })
      this.onOrderCompleted$.next(newOrder);
    })
    .catch(error => this.onOrderCompleted$.error(error));
  }
}
