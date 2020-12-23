import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../recipes/recipe.model';
import {AuthService} from '../../../auth/auth.service';
import {faClock, faTable, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-recipe-item',
  templateUrl: './all-recipe-item.component.html',
  styleUrls: ['./all-recipe-item.component.scss']
})
export class AllRecipeItemComponent implements OnInit {
  faClock = faClock;
  faTable = faTable;
  faUser = faUser;
   @Input() recipe: Recipe;
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
  }

}
