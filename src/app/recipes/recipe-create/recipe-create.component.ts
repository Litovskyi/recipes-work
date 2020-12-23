import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {faSave, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../shared/alert.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {
  formGroup: FormGroup;
  faSave = faSave;
  faDelete = faTrashAlt;
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService) {

  }

  ngOnInit() {
    this.initForm();
  }


  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    // @ts-ignore
    const recipe: Recipe = {
      name: this.formGroup.value.name,
      description: this.formGroup.value.description,
      images: this.formGroup.value.images,
      timeOfCock: this.formGroup.value.timeOfCock,
      ingredients: this.formGroup.value.ingredients,
      steps: this.formGroup.value.steps,
      date: new Date()
    };

    this.recipeService.createRecipe(recipe)
      .subscribe(() => {
        this.formGroup.reset();
        this.alertService.success('Post was created!');
        this.onCancel();
      });
  }

  initForm() {
    const recipeIngredients = new FormArray([]);
    const recipeSteps = new FormArray([]);
    const images = new FormArray([]);

    this.formGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      images,
      timeOfCock: new FormControl(null, Validators.required),
      ingredients: recipeIngredients,
      steps: recipeSteps
    });

  }

  onCancel() {
    this.router.navigate(['/recipes'], {relativeTo: this.route});
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


  onAddIngredient(): void {
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
// додати кроки приготування
  onAddSteps() {
    (this.formGroup.get('steps') as FormArray).push(
      new FormGroup({
        text: new FormControl(null, Validators.required)
      })
    );
  }
// додати картинки
  onAddImages() {
    (this.formGroup.get('images') as FormArray).push(
      new FormGroup({
        path: new FormControl(null, Validators.required)
      })
    );
  }

  // видалення поля інгредієнтів
  onDeleteIngredient(id: number) {
    (this.formGroup.get('ingredients') as FormArray).removeAt(id);
  }
// видалення поля кроків приготування
  onDeleteStep(id: number) {
    (this.formGroup.get('steps') as FormArray).removeAt(id);
  }
// видалення поля картинок
  onDeleteImage(id: number) {
    (this.formGroup.get('images') as FormArray).removeAt(id);
  }
}
