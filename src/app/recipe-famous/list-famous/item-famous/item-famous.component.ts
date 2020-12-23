import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../recipes/recipe.model';
import {FamousRecipe} from '../../famous-recipe.model';

@Component({
  selector: 'app-item-famous',
  templateUrl: './item-famous.component.html',
  styleUrls: ['./item-famous.component.scss']
})
export class ItemFamousComponent implements OnInit {

  @Input() famousRecipe: FamousRecipe;

  constructor() {
  }

  ngOnInit() {
  }

}
