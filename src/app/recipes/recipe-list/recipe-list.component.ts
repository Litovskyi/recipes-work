import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {faClock, faPlus, faTable} from '@fortawesome/free-solid-svg-icons';
import {Observable, Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  searchStr = '';
  faPlus = faPlus;
  recipes$: Observable<Recipe[]>;
  p = 1;

  constructor(private recipeService: RecipeService,) {
  }

  // отримуємо дані з сервісу про вибраний рецепт
  ngOnInit() {
    this.recipes$ = this.recipeService.getRecipes();
  }
}
