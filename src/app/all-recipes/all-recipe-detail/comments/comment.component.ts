import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Comments} from './comment.model';
import {CommentsService} from './comments.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../../../recipes/recipe.model';
import {faTable, faUserAlt} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  faTable = faTable;
  faUser = faUserAlt;
  formGroup: FormGroup;
  content: FormControl;
  comments$: Observable<Comments[]>;
  @Input() recipe: string;
  isAuthenticated = false;
  userID: string;
  userName: string;
  isLoading = false;
  private userSub: Subscription;

  constructor(private commentsService: CommentsService,
              private authService: AuthService) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.userID = user.id;
        this.userName = user.email;
      }
    });
  }

// отримання списку коментарів
  ngOnInit() {

    this.comments$ = this.commentsService.getComments(this.recipe);
    this.initForm();
    this.userSub = this.authService.user
      .subscribe(user => {
        this.isAuthenticated = !!user;

      });
  }

  // відправлення даних форми в сервіс comment.service.ts
  toComment() {
    // @ts-ignore
    if (this.formGroup.invalid) {
      return;
    }
    const comment: Comments = {
      content: this.formGroup.value.content,
      date: new Date(),
      recipeId: this.recipe,
      userId: this.userID,
      displayName: this.userName
    };

    this.isLoading = true;
    this.commentsService.addComment(comment, this.recipe)
      .subscribe(() => {
        this.formGroup.reset();
        this.isLoading = false;
        this.ngOnInit();
      }, error => {
        console.log(error);
        this.isLoading = false;
      });
  }

// ініціалізація форми
  initForm() {
    this.formGroup = new FormGroup({
      content: new FormControl(null, Validators.required)
    });
  }
}
