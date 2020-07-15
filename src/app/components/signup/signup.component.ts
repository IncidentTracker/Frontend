import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/services/sign-up.service';
import { Router } from "@angular/router";
import { ViewEncapsulation } from '@angular/core';
import { CustomValidators } from 'src/app/services/custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SignupComponent implements OnInit {

  FillForm: FormGroup;
  submitted = false;
  hide = true; 

  constructor(public formBuilder: FormBuilder, private SignSer: SignUpService, public router: Router) { }

  ngOnInit() {
    this.FillForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      team: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.patternValidator(/\d/, { hasNumber: true }), Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: CustomValidators.passwordMatchValidator
      });
  }
  get f() { return this.FillForm.controls; }

  onSubmit() {
    var mphasisUser = this.FillForm.value.email;
    var isMphasisUser = mphasisUser.slice(mphasisUser.length - 12, mphasisUser.length);
    if (this.FillForm.valid) {
      this.submitted = true;
      if (isMphasisUser == "@mphasis.com") {
        var NewData = [];
        NewData.push(this.FillForm.value);

        this.SignSer.AddData(NewData[0])
          .subscribe(data => {
            alert(data.Error);
            if (data.Success) {
              this.SignSer.GenerateOTP(this.FillForm.value.email)
                .subscribe(data => {
                  alert(data.Error);
                  if (data.Success)
                    this.router.navigate(['/first-time-token']);
                });
            }
          });
      }
      else
        alert("Use your Mphasis id for Registration!");
    } else {
      alert("Fill in the mandatory fields");
    }
  }
  Clear() {
    this.submitted = false;
    this.FillForm.reset();
  }
  backToLogin() {
    this.router.navigate(['/']);
  }
}
