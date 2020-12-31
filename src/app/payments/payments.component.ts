import { Component, OnInit } from '@angular/core';
import { Subscription ,  Observable } from "rxjs";



import { Candies } from "../shared/candies.model";
import { StorageService } from "../shared/storage.service";
import { FormArray, NgForm} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { PurchasesI } from "../shared/purchases";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(private storageService: StorageService,
              private toastr: ToastrService) {}


  purchases: PurchasesI[];
  subscription: Subscription;

  ngOnInit() {
    return this.storageService.getDataPurchases()
      .subscribe(
        items => {
          this.purchases = items;
        }
      );
  }

  /* Toast Success Message */
  showSuccess() {
    this.toastr.success('Compra Exitosa', 'Kiosco Santex');
  }

}
