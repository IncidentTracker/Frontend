import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { AuthServService } from 'src/app/services/auth-serv.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login-b',
  templateUrl: './login-b.component.html',
  styleUrls: ['./login-b.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginBComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error: any;
  hide = true;

  constructor(public formBuilder: FormBuilder,
    private auth_ser: AuthServService,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.auth_ser.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(user => {
        if (user.Success) {
          this.auth_ser.Username = user.Data.firstname;
          this.router.navigate(['/search']);
        }
        else {
          alert(user.Error);
        }
      },
        error => {
          this.error = error;
          alert(error);
        });
    }

  }

  reset() {
    this.router.navigate(['/Forgot']);
  }

  signUp() {
    this.router.navigate(['/Sign']);
  }

}
