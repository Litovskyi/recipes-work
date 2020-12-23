import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Recipe} from '../../recipes/recipe.model';
import {RecipeService} from '../../recipes/recipe.service';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-recipes-list',
  templateUrl: './all-recipes-list.component.html',
  styleUrls: ['./all-recipes-list.component.css']
})
export class AllRecipesListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  searchStr = '';
  faPlus = faPlus;
  p = 1;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes$ = this.recipeService.getAllRecipes();
  }

}
