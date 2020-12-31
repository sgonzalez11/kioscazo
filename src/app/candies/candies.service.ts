import { Injectable } from '@angular/core';
// import { Http, Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Candies } from '../shared/candies.model';


@Injectable()
export class CandiesService {

  candiesChanged = new Subject<Candies[]>();

  constructor(private http: HttpClient) {}

  private candies: Candies[] = [
    new Candies('Chocolina',
      'Galletas de Chocolates',
      10,
      'http://www.pasteleriaamerica2.com/wp-content/uploads/2016/06/CHOCOLINAS-DE-BAGLEY.jpg',
    ),
    new Candies(
      'Rumba',
      'Galletas Rellena con Chocolate',
      19,
      'http://juanmeatmarket.com/images/3-2013-05-10-11-12-06-rumba.jpg',
    ),
  ];

  saveCandie(candie: Candies) {
    this.candies.push(candie);
    this.candiesChanged.next(this.candies.slice());
  }

  getCandies() {
    return this.candies.slice();
  }

  setCandies(candies: Candies[]) {
    this.candies = candies;
    this.candiesChanged.next(this.candies.slice());
  }
}
