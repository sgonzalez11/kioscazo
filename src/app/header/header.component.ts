import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private storageService: StorageService) {}

  ngOnInit() {
  }

  onSaveData() {
    this.storageService.storeCandies()
      .subscribe(
        (response: HttpResponse<any>) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.storageService.getCandies()
      .subscribe(
        (response: HttpResponse<any>) => {
          console.log(response);
        }
      );
  }

}
