import {Ingredient,} from '../shared/ingredient.model';
import {StepsModel} from '../shared/steps.model';
import {Images} from '../shared/images.model';

export class Recipe {
  public id?: string;
  public name: string;
  public description: string;
  public images: Images[];
  public timeOfCock: string;
  public ingredients: Ingredient[];
  public steps: StepsModel[];
  public date: Date;
  public userId: string;
  public userName: string

  // tslint:disable-next-line:max-line-length
  constructor(id: string, name: string, desc: string, images: Images[], timeOfCock: string, ingredients: Ingredient[], date: Date, steps: StepsModel[]) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.images = images;
    this.timeOfCock = timeOfCock;
    this.ingredients = ingredients;
    this.date = date;
    this.steps = steps;
  }
}
