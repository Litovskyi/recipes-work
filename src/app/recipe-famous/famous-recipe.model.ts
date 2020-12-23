import {Videos} from './shared/videos.model';

export class FamousRecipe {
  public id?: string;
  public about: string;
  public famous: string;
  public videos: Videos[];
  public img: string;

  constructor(id: string, about: string, famous: string, videos: Videos[], img: string) {
    this.id = id;
    this.about = about;
    this.famous = famous;
    this.videos = videos;
    this.img = img;

  }
}
