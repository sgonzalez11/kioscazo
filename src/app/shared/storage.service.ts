import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Http, Response } from '@angular/http';
import { CandiesService } from '../candies/candies.service';
import 'rxjs/Rx';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { Candies } from './candies.model';
import { CandiesI } from './candies';
import { PurchasesI } from './purchases';
import { AuthService } from '../core/auth.service';

@Injectable()
export class StorageService {

  candiesCollection: AngularFirestoreCollection<CandiesI>;
  purchasesCollection: AngularFirestoreCollection<PurchasesI>;
  candiesDoc: AngularFirestoreDocument<CandiesI>;
  purchasesDoc: AngularFirestoreDocument<PurchasesI>;
  candie: Observable<any>;
  purchase: Observable<any>;

  constructor(private http: HttpClient,
              private candieService: CandiesService,
              private afs: AngularFirestore,
              private authService: AuthService) {

    this.candiesCollection = this.afs.collection('candies', ref => {
      return ref.orderBy('name', 'asc');
    });
    this.purchasesCollection = this.afs.collection('purchases', ref => {
      return ref.orderBy('email', 'asc');
    });
  }

  // Get Candies Using FireStore
  getData() {
    // Se Devuelve el Observable directamente no se devuelve una referencia (variable)
    return this.afs.collection('candies').snapshotChanges()
      .map( changes => {
        console.log(changes);
        return changes.map(a => {
          const data = a.payload.doc.data() as CandiesI;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  getDataPurchases() {
    return this.afs.collection('purchases').snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as PurchasesI;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  // Add Data Using FireStore
  addData(candie: CandiesI) {
    console.log('Add Data Storage Service');
    this.candiesCollection.add(candie);
  }

  // Add Purchase Using FireStore
  addPurchase(purchase: PurchasesI) {
    console.log('Added Purchase');
    this.purchasesCollection.add(purchase)
      .then((docRef) => {
        this.purchasesCollection.doc(docRef.id).update({
          id: docRef.id
        });
      });
  }

  // Delete Data Using FireStore
  deleteData(candie: CandiesI) {
    this.candiesDoc = this.afs.doc(`candies/${candie.id}`);
    this.candiesDoc.delete();
  }

  getDetail(id: string) {
    // console.log("id --->" +id);
    this.candiesDoc = this.afs.doc('candies/' + id);
    this.candie = this.candiesDoc.valueChanges();
    // console.log("this.candie: "+this.candie);
    return this.candie;
  }


  storeCandies() {
    return this.http.put('https://ng-santex-kiosco.firebaseio.com/candies.json', this.candieService.getCandies());
  }

  getCandies() {
    return this.http.get('https://ng-santex-kiosco.firebaseio.com/candies.json');
   /* this.http.get('https://ng-santex-kiosco.firebaseio.com/candies.json')
      .map(
        (response: Response) => {
          const candies: Candies[] = response.json();
          return candies;
        }
      )
      .subscribe(
        (candies: Candies[]) => {
          this.candieService.setCandies(candies);
        }
      )*/
  }
}
