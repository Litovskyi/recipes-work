import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../recipes/recipe.service';
import {Observable} from 'rxjs';
import {FamousRecipe} from '../famous-recipe.model';

@Component({
  selector: 'app-list-famous',
  templateUrl: './list-famous.component.html',
  styleUrls: ['./list-famous.component.css']
})
export class ListFamousComponent implements OnInit {

  searchStr = '';
  famousRecipe$: Observable<FamousRecipe[]>;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.famousRecipe$ = this.recipeService.getFamousRecipes();
  }

}
