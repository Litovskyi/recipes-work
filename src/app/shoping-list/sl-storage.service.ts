import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopingListService} from './shoping-list.service';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';
import {AlertService} from '../shared/alert.service';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class SlStorageService {

  userId: string;

  constructor(
    private http: HttpClient,
    private slService: ShopingListService,
    private authService: AuthService,
    private alertService: AlertService) {
    this.authService.user.subscribe(user => {
      if (user) {
      }
      this.userId = user.id;
    });

  }

  storeProducts() {
    const products = this.slService.fetchProducts();
    this.http.put(`${environment.firebaseConfig.databaseURL}/products/${this.userId}.json`, products)
      .subscribe(() => {
        this.alertService.success('Збережено!');
      });
  }
}
