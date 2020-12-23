import {Component, OnDestroy, OnInit} from '@angular/core';
import {faCrown, faListUl, faPizzaSlice, faShoppingBasket, faUser} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import construct = Reflect.construct;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  faPizza = faPizzaSlice;
  faShoppingBasket = faShoppingBasket;
  faAllRecipes = faListUl;
  faUser = faUser;
  isCollapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;
  faCrown = faCrown;

  displayName: string;

  constructor(private authService: AuthService
  ) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.displayName = user.email;
      }
    });
  }

  // перевірка чи користувач авторизований
  ngOnInit() {
    this.userSub = this.authService.user
      .subscribe(user => {
        this.isAuthenticated = !!user;

      });
  }
// вихід із системи
  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
