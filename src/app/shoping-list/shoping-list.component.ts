import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShopingListService} from './shoping-list.service';
import {Subscription} from 'rxjs';
import {faPrint} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.scss']
})
export class ShopingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  faPrint = faPrint;
  private igChangeSub: Subscription;

  constructor(private slService: ShopingListService) {
  }

  // отримання списку продукту із shopping-list.service.ts
  ngOnInit() {
    this.slService.fetchProducts().subscribe(res => {
      this.ingredients = res;
    });
    this.igChangeSub = this.slService.ingredientChanged
      .subscribe(
        (ingredient: Ingredient[]) => {
          this.ingredients = ingredient;
        }
      );
  }

  // редагування продукту
  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
// друкування
  printComponent(ingredientsList: string) {
    const printContents = document.getElementById(ingredientsList).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
// збереження даних
  saveData() {
    this.slService.storeProducts();
  }
}
