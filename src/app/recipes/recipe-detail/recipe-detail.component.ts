import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ModalDismissReasons, NgbCarouselConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faCartPlus, faCheckDouble, faClock, faEdit, faTable, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Observable, pipe, Subscription} from 'rxjs';
import {delay, switchMap} from 'rxjs/operators';
import {Ingredient} from '../../shared/ingredient.model';
import {AlertService} from '../../shared/alert.service';
import {async} from '@angular/core/testing';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  faCheckDouble = faCheckDouble;
  faClock = faClock;
  faTable = faTable;
  faEdit = faEdit;
  faTrash = faTrash;
  faCartPlus = faCartPlus;
  recipe$: Observable<Recipe>;
  dSub: Subscription;
  closeResult: string;
  recipe: Recipe;

  currentIndex = -1;
  currentObj = [];
  showFlag: any = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService,
    config: NgbCarouselConfig) {
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.recipe$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.recipeService.getRecipe(params.id);
      }));
  }




  onAddToTheShoppingList(ingredients: Ingredient[]) {
    this.recipeService.addIngredientsToSL(ingredients);
    this.router.navigate(['shopping-list']);
  }

  onDeleteRecipe(id: string) {
    this.recipeService.deleteRecipe(id)
      .subscribe(response => {
        this.alertService.success('This recipe was successfully deleted!');
      });

    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  showLightbox(object, index) {
    this.currentIndex = index;
    this.currentObj = object;
    console.log('=>', this.currentObj, this.currentIndex);
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }
}
