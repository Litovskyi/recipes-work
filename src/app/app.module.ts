import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipes/recipe-list/recipe-item/recipe-item.component';
import {ShopingListComponent} from './shoping-list/shoping-list.component';
import {ShopingEditComponent} from './shoping-list/shoping-edit/shoping-edit.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {ShopingListService} from './shoping-list/shoping-list.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RecipeService} from './recipes/recipe.service';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorPageComponent} from './recipes/error-page/error-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SearchPipe} from './shared/search.pipe';
import {RecipeCreateComponent} from './recipes/recipe-create/recipe-create.component';
import {AlertComponent} from './shared/components/alert/alert.component';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {NgImageFullscreenViewModule} from 'ng-image-fullscreen-view';
import {RecipeFamousComponent} from './recipe-famous/recipe-famous.component';
import {ItemFamousComponent} from './recipe-famous/list-famous/item-famous/item-famous.component';
import {ListFamousComponent} from './recipe-famous/list-famous/list-famous.component';
import {FamousVideosComponent} from './recipe-famous/famous-videos/famous-videos.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {FamousSearch} from './shared/famousSearch.pipe';
import {GoogleMapsModule} from '@angular/google-maps';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { AllRecipesListComponent } from './all-recipes/all-recipes-list/all-recipes-list.component';
import { AllRecipeItemComponent } from './all-recipes/all-recipes-list/all-recipe-item/all-recipe-item.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AllRecipeDetailComponent } from './all-recipes/all-recipe-detail/all-recipe-detail.component';
import { CommentComponent } from './all-recipes/all-recipe-detail/comments/comment.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {AngularFireStorageModule} from '@angular/fire/storage';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShopingListComponent,
    ShopingEditComponent,
    DropdownDirective,
    RecipeEditComponent,
    ErrorPageComponent,
    SearchPipe,
    RecipeCreateComponent,
    AlertComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    RecipeFamousComponent,
    ItemFamousComponent,
    ListFamousComponent,
    FamousVideosComponent,
    FamousSearch,
    AllRecipesComponent,
    AllRecipesListComponent,
    AllRecipeItemComponent,
    AllRecipeDetailComponent,
    CommentComponent


  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgImageFullscreenViewModule,
    YouTubePlayerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [
    ShopingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
