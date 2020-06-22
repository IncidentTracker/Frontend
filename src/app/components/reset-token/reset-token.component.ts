import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/services/sign-up.service';
import { Router } from "@angular/router";
import { ViewEncapsulation } from '@angular/core';
import { CustomValidators } from 'src/app/services/custom-validators';

@Component({
  selector: 'app-reset-token',
  templateUrl: './reset-token.component.html',
  styleUrls: ['./reset-token.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResetTokenComponent implements OnInit {

  ResetForm: FormGroup;
  submitted = false;
  error: any;

  constructor(public formBuilder: FormBuilder, private SignSer: SignUpService, public router: Router) { }

  ngOnInit(): void {
    this.ResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', Validators.required],
      password: ['', [Validators.required, CustomValidators.patternValidator(/\d/, { hasNumber: true }), Validators.minLength(2)]],
      confirmPassword: ['', Validators.required]
    });
  }
  get f() { return this.ResetForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.ResetForm.valid) {

      this.SignSer.ValidateResetOTP(this.ResetForm.value.email, this.ResetForm.value.token, this.ResetForm.value.password).subscribe(data => {
        alert(data.Error);
        if (data.Success)
          this.backToLogin();
      });
    }
  }
  Clear() {
    this.submitted = false;
    this.ResetForm.reset();
  }
  backToLogin() {
    this.router.navigate(['/']);
  }

}
