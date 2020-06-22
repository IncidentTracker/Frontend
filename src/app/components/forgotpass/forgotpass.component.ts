import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/services/sign-up.service';
import { Router } from "@angular/router";
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotpassComponent implements OnInit {

  PassForm: FormGroup;
  submitted = false;
  error: any;

  constructor(public formBuilder: FormBuilder, private SignSer: SignUpService, public router: Router) { }

  ngOnInit() {
    this.PassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  get f() { return this.PassForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.PassForm.valid) {
      this.SignSer.ResetPassword(this.PassForm.value.email).subscribe(data => {
        alert(data.Error);
        if (data.Success)
          this.router.navigate(['/password-reset']);
      },
        error => {
          this.error = error;
          alert(error);
        });
    }
  }
  Clear() {
    this.submitted = false;
    this.PassForm.reset();
  }
  BacktoLogin() {
    this.router.navigate(['/']);
  }
}
