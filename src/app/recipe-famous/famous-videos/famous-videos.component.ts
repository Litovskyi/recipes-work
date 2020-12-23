import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FamousRecipe} from '../famous-recipe.model';
import {Recipe} from '../../recipes/recipe.model';
import {RecipeService} from '../../recipes/recipe.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-famous-videos',
  templateUrl: './famous-videos.component.html',
  styleUrls: ['./famous-videos.component.css']
})
export class FamousVideosComponent implements OnInit {

  famousRecipe$: Observable<FamousRecipe>;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {
  }

  //отримання списку відео певного шефа та підключення YouTube API
  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.famousRecipe$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.recipeService.getFamousRecipe(params.id);
      }));
  }

}
