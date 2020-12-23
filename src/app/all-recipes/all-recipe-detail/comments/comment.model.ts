export class Comments {
  public id?: string;
  public recipeId: string;
  public userId: string;
  public displayName: string;
  public date: Date;
  public content: string;

  constructor(recipeId: string, id: string, userId: string, displayName: string, date: Date, content: string) {
    this.recipeId = recipeId;
    this.id = id;
    this.userId = userId;
    this.displayName = displayName;
    this.date = date;
    this.content = content;
  }
}

