import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShopingListService} from '../shoping-list/shoping-list.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Recipe} from './recipe.model';
import {map} from 'rxjs/operators';
import {FbCreateResponse} from '../shared/interfaces';
import {AuthService} from '../auth/auth.service';
import {FamousRecipe} from '../recipe-famous/famous-recipe.model';


@Injectable()
export class RecipeService {

  userID: string;
  userName: string;

  recipe: Observable<Recipe[]>;

  constructor(private slService: ShopingListService,
              private http: HttpClient,
              private authService: AuthService
  ) {
    // приймаємо ідентифікатор поточного користувача в системі
    this.authService.user.subscribe(user => {
      if (user) {
        this.userID = user.id;
        this.userName = user.email;
      }
    });

  }

  // отримуємо власних список рецептів
  getRecipes(): Observable<Recipe[]> {
    if (!this.userID) {
      return;
    }
    return this.http.get(`${environment.firebaseConfig.databaseURL}/recipes.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date),
          }))
          .sort(((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
          .filter(p => p.userId === this.userID);
      }));

  }

// отримуємо список рецептів для всі користувачі
  getAllRecipes(): Observable<Recipe[]> {
    if (!this.userID) {
      return;
    }
    return this.http.get(`${environment.firebaseConfig.databaseURL}/recipes.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date),
          })).sort(((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      }));

  }

  // створення рецепту
  createRecipe(recipe: Recipe) {
    recipe.userId = this.userID;
    recipe.userName = this.userName;
    return this.http.post(`${environment.firebaseConfig.databaseURL}/recipes.json`, recipe)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...recipe,
          id: response.name,
          date: new Date(recipe.date)
        };
      }));
  }

// отримуємо певний рецепт по ідентифікатору
  getRecipe(id: string): Observable<Recipe> {
    if (!this.userID) {
      return;
    }
    return this.http.get<Recipe>(`${environment.firebaseConfig.databaseURL}/recipes/${id}.json`)
      .pipe(map((recipe: Recipe) => {
        return {
          ...recipe, id,
          date: new Date(recipe.date)
        };
      }));
  }

  // добавляємо інгредієнти в список продуктів із детальної інформації про рецепт
  addIngredientsToSL(ingredient: Ingredient[]) {
    this.slService.addIngredients(ingredient);
  }

// редагування рецепту
  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.patch<Recipe>(`${environment.firebaseConfig.databaseURL}/recipes/${recipe.id}.json`, recipe);
  }

// видалення рецепту
  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebaseConfig.databaseURL}/recipes/${id}.json`);
  }

// отримання списку шефів
  getFamousRecipes(): Observable<FamousRecipe[]> {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/famousPeople.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
          }));
      }));
  }

  // отримання інформації певного шефа
  getFamousRecipe(id: string): Observable<FamousRecipe> {
    return this.http.get<FamousRecipe>(`${environment.firebaseConfig.databaseURL}/famousPeople/${id}.json`)
      .pipe(map((famousRecipe: FamousRecipe) => {
        return {
          ...famousRecipe, id
        };
      }));
  }

}
