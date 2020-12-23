import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

import {AlertService} from '../shared/alert.service';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class ShopingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [];
  userId: string;

  constructor(private http: HttpClient,
              private alertService: AlertService,
              private authService: AuthService) {
    // отримання поточного користувача для якого потрібно зберігати продукти
    this.authService.user.subscribe(user => {
      if (user) {
        this.userId = user.id;
      }
    });

  }

// зберігання списку продуктів в БД
  storeProducts() {
    const products = this.getIngredients();
    this.http.put(`${environment.firebaseConfig.databaseURL}/products/${this.userId}.json`, products)
      .subscribe(() => {
        this.alertService.success('Збережено!');
      });
  }
// отримання продуктів із БД
  fetchProducts() {
    return this.http.get<Ingredient[]>(`${environment.firebaseConfig.databaseURL}/products/${this.userId}.json`);
  }
//
  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());

  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
