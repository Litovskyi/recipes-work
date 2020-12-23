import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShopingListComponent} from './shoping-list/shoping-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {ErrorPageComponent} from './recipes/error-page/error-page.component';
import {RecipeCreateComponent} from './recipes/recipe-create/recipe-create.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/auth.guard';
import {RecipeFamousComponent} from './recipe-famous/recipe-famous.component';
import {FamousVideosComponent} from './recipe-famous/famous-videos/famous-videos.component';
import {AllRecipesComponent} from './all-recipes/all-recipes.component';
import {AllRecipeDetailComponent} from './all-recipes/all-recipe-detail/all-recipe-detail.component';


const routes: Routes = [
  {path: '', redirectTo: '/all-recipes', pathMatch: 'full'},
  {path: 'all-recipes', component: AllRecipesComponent},
  {path: 'all-recipes/:id', component: AllRecipeDetailComponent},
  {path: 'famous-recipe', component: RecipeFamousComponent},
  {path: 'famous-recipe/:id', component: FamousVideosComponent},
  {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard]},
  {path: 'shopping-list', component: ShopingListComponent, canActivate: [AuthGuard]},
  {path: 'recipes/:id', component: RecipeDetailComponent, canActivate: [AuthGuard]},
  {path: 'new', component: RecipeCreateComponent, canActivate: [AuthGuard]},
  {path: 'recipes/edit/:id', component: RecipeEditComponent, canActivate: [AuthGuard]},
  {path: 'error', component: ErrorPageComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
