import { Component, OnInit } from '@angular/core';
import { Subscription ,  Observable } from "rxjs";



import { CandiesService } from "../candies.service";
import { Candies } from "../../shared/candies.model";
import { StorageService } from "../../shared/storage.service";
import { FormArray, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CandiesI } from "../../shared/candies";
import { PurchasesI } from "../../shared/purchases";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent } from "../../ngbd-modal/ngbd-modal.component";

@Component({
  selector: 'app-candies-list',
  templateUrl: './candies-list.component.html',
  styleUrls: ['./candies-list.component.css']
})
export class CandiesListComponent implements OnInit {

  constructor(private candieService: CandiesService,
              private storageService: StorageService,
              private toastrService: ToastrService,
              private modalService: NgbModal) {}

  emailsSantex = ['sebastian.gonzalez@santexgroup.com', 'gaston.nieto@santexgroup.com', 'eduardo.coll@santexgroup.com', 'martin.navarro@santexgroup.com',
  'sebastian.pereira@santexgroup.com', 'martin.zangl@santexgroup.com'];

  candies: Candies[];
  candiesI: CandiesI[];
  candieIDetail: CandiesI;
  candieEditMode = false;
  purchasesForm: FormGroup;

  subscription: Subscription;
  closeResult: string;
  acceptPurchase: boolean = false;


  purchaseI: PurchasesI = {
    id: '',
    email: '',
    candieName: '',
    quantity: 0,
    price: 0
  }

  public model: any;
  search = (text$: Observable<string>) => text$.debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? [] : this.emailsSantex.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  ngOnInit() {
    this.storageService.getData()
      .subscribe(
        items => {
          this.candiesI = items;
        });
    this.initPurchaseForm()
  }

  private initPurchaseForm() {
    let purchaseEmail = '';
    let purchaseQuantity = '';

    this.purchasesForm = new FormGroup({
      'email': new FormControl(purchaseEmail, Validators.required),
      'quantity': new FormControl(purchaseQuantity, Validators.required),
    });
  }


  deleteCandie(event, candie) {
    this.storageService.deleteData(candie);
  }

  showDetailCandie(id: string) {
    this.storageService.getDetail(id).subscribe(items => {
      this.candieIDetail = items;
      this.candieEditMode = true;
      console.log(this.candieIDetail);
    })
  }

  /* New Purchase Using Firestore */
  onNewPurchase() {
    this.purchaseI.email = this.purchasesForm.value['email'];
    this.purchaseI.candieName = this.candieIDetail.name;
    this.purchaseI.quantity = this.purchasesForm.value['quantity'];
    this.purchaseI.price = this.candieIDetail.price;
    this.open();
  }

  /* Toast Success Message */
  showSuccess() {
    this.toastrService.success('Compra Exitosa', 'Kiosco Santex');
  }

  /* Toast Cancel Message */
  showCancel() {
    this.toastrService.error('Compra Cancelada', 'Kiosco Santex');
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalComponent);
    modalRef.componentInstance.confirmationBoxTitle = 'Kiosco Santex';
    modalRef.componentInstance.confirmationMessage = '¿Estas seguro de comprar?';

    modalRef.result
      .then((userResponse) => {
        if (userResponse) {
          this.storageService.addPurchase(this.purchaseI);
          this.showSuccess()
        } else {
          this.showCancel()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /* Confirmation Message Purchase */
 /* modalPurchase(candieIDetail, modal) {
    console.log(modal);
    this.modalService.open(modal);
  }*/

 /* open(content) {
    this.modalService.open(content).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }*/

}


/*    const self = this;
 this.candies = [];
 this.subscription = this.candieService.candiesChanged
 .subscribe(
 (candies: Candies[]) => {
 this.candies = candies;
 }
 );
 this.storageService.getCandies().subscribe(
 data => {
 // Get the candies and remove null elements
 self.candies = data.json().filter(element => !!element);
 }
 );*/
//this.candies = this.candieService.getCandies();

