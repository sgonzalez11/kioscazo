import { Component, OnInit } from '@angular/core';
import { AuthService } from "../core/auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    if (form.valid) {
      this.authService.emailSignup(email, password);
    }
  }

}
