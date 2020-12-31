import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-ngbd-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{confirmationBoxTitle}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{confirmationMessage}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close(true)">Yes</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close(false)">No</button>
    </div>`
})
export class NgbdModalComponent implements OnInit {

  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
