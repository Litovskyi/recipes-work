import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../recipe.service';
import {faClock, faTable} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  faClock = faClock;
  faTable = faTable;

  userID: string;
  constructor(private authService: AuthService) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.userID = user.id;

      }
    });
  }

  ngOnInit() {
  }

}
