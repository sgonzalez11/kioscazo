import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
// import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs';
// import {Response} from '@angular/http';
import {Candies} from '../../shared/candies.model';
import {CandiesService} from '../candies.service';
import {StorageService} from '../../shared/storage.service';
import {CandiesI} from '../../shared/candies';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalComponent} from '../../ngbd-modal/ngbd-modal.component';

@Component({
    selector: 'app-candies-new',
    templateUrl: './candies-new.component.html',
    styleUrls: ['./candies-new.component.css']
})
export class CandiesNewComponent implements OnInit {

    candiesForm: FormGroup;

    task: AngularFireUploadTask;
    percentage: Observable<number>;
    snapshot: Observable<any>;
    downloadUrl: Observable<string>;
    isHovering: boolean;

    constructor(private candieService: CandiesService,
                private storageService: StorageService,
                private storageImage: AngularFireStorage,
                private toastrService: ToastrService,
                private modalService: NgbModal) {
    }

    candieI: CandiesI = {
        name: '',
        description: '',
        price: 0,
        imagepath: '',
        caloriesPerServing: 0
    };

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        const candieName = '';
        const candiePrice = '';
        const candieDescription = '';
        const candieImagePath = '';
        const candieCalories = '';

        this.candiesForm = new FormGroup({
            'name': new FormControl(candieName, Validators.required),
            'price': new FormControl(candiePrice, Validators.required),
            'description': new FormControl(candieDescription, Validators.required),
            'imagepath': new FormControl(candieImagePath, Validators.required),
            'calories': new FormControl(candieCalories),
        });
    }

    onSubmit() {
        const newCandie = new Candies(
            this.candiesForm.value['name'],
            this.candiesForm.value['description'],
            this.candiesForm.value['price'],
            this.candiesForm.value['imagePath'],
        );
        this.candieService.saveCandie(newCandie);
        /*    this.storageService.storeCandies()
          .subscribe(() => {});*/
    }


    /* Save Candie using Firestore */
    onNewCandie() {
        this.candieI.name = this.candiesForm.value['name'];
        this.candieI.description = this.candiesForm.value['description'];
        this.candieI.price = this.candiesForm.value['price'];
        this.candieI.imagepath = this.candiesForm.value['imagepath'];
        this.candieI.caloriesPerServing = this.candiesForm.value['calories'];
        this.open();
    }

    open() {
        const modalRef = this.modalService.open(NgbdModalComponent);
        modalRef.componentInstance.confirmationBoxTitle = 'Kiosco';
        modalRef.componentInstance.confirmationMessage = '¿Estas seguro de crear esta nueva golosina?';
        console.log(this.candieI);
        modalRef.result
            .then((userResponse) => {
                if (userResponse) {
                    this.storageService.addData(this.candieI);
                    this.showSuccess();
                } else {
                    this.showCancel();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /*  IMAGE UPLOADER SECTION */
    toogleHover(event: boolean) {
    }

    startUpload(event: FileList) {

        const file = event.item(0);

        if (file.type.split('/')[0] !== 'image') {
            console.error('unsupported file type');
            return;
        }
        const path = `images/${new Date().getTime()}_${file.name}`;
        const customMetadata = {app: 'Uploader made by Sebastian'};

        this.task = this.storageImage.upload(path, file, {customMetadata});
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges();
        this.downloadUrl = this.task.downloadURL();

    }

    isActive(snapshot) {
        return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }

    /* Toast Success Message */
    showSuccess() {
        this.toastrService.success('Se cargo la nueva Golosina', 'Kiosco Santex');
    }

    /* Toast Cancel Message */
    showCancel() {
        this.toastrService.error('Golosina Cancelada', 'Kiosco Santex');
    }

}
