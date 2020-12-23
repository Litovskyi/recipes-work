import {Pipe, PipeTransform} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';

@Pipe({
  name: 'searchRecipes'
})

export class SearchPipe implements PipeTransform {
  transform(recipes: Recipe[], search = ''): Recipe[] {
    if (!search.trim()) {
      return recipes;
    }
    return recipes.filter(recipe =>{
      return recipe.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
