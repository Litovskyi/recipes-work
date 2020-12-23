import {Component, OnDestroy, OnInit} from '@angular/core';
import {faPlus, faSave, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {RecipeService} from '../recipe.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {AlertService} from '../../shared/alert.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  faSave = faSave;
  faDelete = faTrashAlt;
  faPlus = faPlus;
  formGroup: FormGroup;
  recipe: Recipe;
  submitted = false;
  sub: Subscription;


  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.recipeService.getRecipe(params.id);
        })
      ).subscribe((recipe: Recipe) => {
      this.recipe = recipe;
      this.initForm();
    });
  }

  // відправка редагованих даних форми в recipe.service.ts
  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.submitted = true;
    this.sub = this.recipeService.updateRecipe({
      ...this.recipe,
      name: this.formGroup.value.name,
      description: this.formGroup.value.description,
      images: this.formGroup.value.images,
      timeOfCock: this.formGroup.value.timeOfCock,
      ingredients: this.formGroup.value.ingredients,
      steps: this.formGroup.value.steps
    })
      .subscribe(() => {
        this.submitted = false;
        this.alertService.success('Post was updated!');
        this.onCancel();
      });


  }
// ініціалізація форми
  private initForm() {

    let recipeTimeOfCock = '';
    let recipeName = '';
    let recipeDescription = '';

    const recipeIngredients = new FormArray([]);
    const recipeSteps = new FormArray([]);
    const recipeImages = new FormArray([]);


    recipeTimeOfCock = this.recipe.timeOfCock;
    recipeName = this.recipe.name;
    recipeDescription = this.recipe.description;


    if (this.recipe.ingredients) {
      for (const ingredient of this.recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          })
        );
      }
    }

    if (this.recipe.steps) {
      for (const step of this.recipe.steps) {
        recipeSteps.push(
          new FormGroup({
            text: new FormControl(step.text, Validators.required)
          })
        );
      }
    }
    if (this.recipe.images) {
      for (const image of this.recipe.images) {
        recipeImages.push(
          new FormGroup({
            path: new FormControl(image.path, Validators.required)
          })
        );
      }
    }


    this.formGroup = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      images: recipeImages,
      timeOfCock: new FormControl(recipeTimeOfCock, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
      steps: recipeSteps

    });
  }

  get controlsIngredients() {
    return (this.formGroup.get('ingredients') as FormArray).controls;
  }

  get controlsSteps() {
    return (this.formGroup.get('steps') as FormArray).controls;
  }

  get controlsImages() {
    return (this.formGroup.get('images') as FormArray).controls;
  }

// добавити інгредієнти
  onAddIngredient() {
    (this.formGroup.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null,
          [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ]
        )
      })
    );
  }
// добавити кроки приготування
  onAddSteps() {
    (this.formGroup.get('steps') as FormArray).push(
      new FormGroup({
        text: new FormControl(null, Validators.required)
      })
    );
  }
// добавити картинки
  onAddImages() {
    (this.formGroup.get('images') as FormArray).push(
      new FormGroup({
        path: new FormControl(null, Validators.required)
      })
    );
  }

  onCancel() {
    this.router.navigate(['/recipes', this.recipe.id], {relativeTo: this.route});
  }
// видалити поле інгредієнти
  onDeleteIngredient(id: number) {
    (this.formGroup.get('ingredients') as FormArray).removeAt(id);
  }
// видалити поле із кроком приготування
  onDeleteStep(id: number) {
    (this.formGroup.get('steps') as FormArray).removeAt(id);
  }
// видалити поле із додаванням картинки
  onDeleteImage(id: number) {
    (this.formGroup.get('images') as FormArray).removeAt(id);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
