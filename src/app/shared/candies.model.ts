export class Candies {

  public name: string;
  public description: string;
  public price: number;
  public imagepath: string;

  constructor(name: string, description: string, price: number, imagepath: string) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.imagepath = imagepath;
  }
}
