import {Injectable, Input, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Comments} from './comment.model';
import {filter, map} from 'rxjs/operators';
import {RecipeService} from '../../../recipes/recipe.service';
import {Recipe} from '../../../recipes/recipe.model';
import {FbCreateResponse} from '../../../shared/interfaces';
import {AuthService} from '../../../auth/auth.service';
import {sortedChanges} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  constructor(private http: HttpClient) {
  }

  getComments(id: string): Observable<Comments[]> {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/comments/${id}.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key]
          }))
          .sort(((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      }));
  }

  addComment(comment: Comments, id: string) {
    return this.http.post(`${environment.firebaseConfig.databaseURL}/comments/${id}.json`, comment)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...comment,
          id: response.name,
          date: new Date(comment.date)
        };
      }));
  }


}
