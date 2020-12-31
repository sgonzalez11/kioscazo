import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { CoreModule } from './core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { HomeComponent } from './home/home.component';
import { CandiesComponent } from './candies/candies.component';
import { CandiesNewComponent } from './candies/candies-new/candies-new.component';
import { CandiesListComponent } from './candies/candies-list/candies-list.component';
import { CandiesService } from './candies/candies.service';
import { StorageService } from './shared/storage.service';
import { FileSizePipe } from './file-size.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PaymentsComponent } from './payments/payments.component';
import { NgbdModalComponent } from './ngbd-modal/ngbd-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DropdownDirective,
    HeaderComponent,
    CandiesComponent,
    CandiesListComponent,
    CandiesNewComponent,
    FileSizePipe,
    LoginComponent,
    RegisterComponent,
    PaymentsComponent,
    NgbdModalComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    CoreModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  entryComponents: [NgbdModalComponent],
  providers: [CandiesService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
