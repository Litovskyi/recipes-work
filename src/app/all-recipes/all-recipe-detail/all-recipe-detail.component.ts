import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {RecipeService} from '../../recipes/recipe.service';
import {Observable, Subscription} from 'rxjs';
import {Recipe} from '../../recipes/recipe.model';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {faCartPlus, faCheckDouble, faClock, faTable, faUser} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-all-recipe-detail',
  templateUrl: './all-recipe-detail.component.html',
  styleUrls: ['./all-recipe-detail.component.scss']
})
export class AllRecipeDetailComponent implements OnInit {
  faCheckDouble = faCheckDouble;
  faClock = faClock;
  faTable = faTable;
  faCartPlus = faCartPlus;
  faUser = faUser;
  recipe$: Observable<Recipe>;
  isAuthenticated = false;
  private userSub: Subscription;

  userName: string;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
    this.authService.user.subscribe(user => {
      this.userName = user.email;
    });
  }
// отримання даних із сервісу про певний рецепт
  ngOnInit() {
    this.recipe$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.recipeService.getRecipe(params.id);
      }));
    this.userSub = this.authService.user
      .subscribe(user => {
        this.isAuthenticated = !!user;

      });
  }
// добавити інгредієнти в список продуктів
  onAddToTheShoppingList(ingredients: Ingredient[]) {
    this.recipeService.addIngredientsToSL(ingredients);
    this.router.navigate(['shopping-list']);
  }
}
