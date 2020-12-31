import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CandiesComponent } from "./candies/candies.component";
import { CandiesNewComponent } from "./candies/candies-new/candies-new.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { PaymentsComponent } from "./payments/payments.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '_register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'candies', component: CandiesComponent },
  { path: 'candie/new', component: CandiesNewComponent },
  { path: 'admin/payments', component: PaymentsComponent },
  ];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
