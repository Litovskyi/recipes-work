import {Pipe, PipeTransform} from '@angular/core';
import {FamousRecipe} from '../recipe-famous/famous-recipe.model';

@Pipe({
  name: 'famousSearch'
})
export class FamousSearch implements PipeTransform {
  transform(famousRecipes: FamousRecipe[], search = ''): FamousRecipe[] {
    if (!search.trim()) {
      return famousRecipes;
    }
    return famousRecipes.filter(famousRecipe => {
      return famousRecipe.famous.toLowerCase().includes(search.toLowerCase());
    });
  }
}
