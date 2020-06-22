import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/services/sign-up.service';
import { Router } from "@angular/router";
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-validateregisration',
  templateUrl: './validateregisration.component.html',
  styleUrls: ['./validateregisration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ValidateregisrationComponent implements OnInit {

  TokenForm: FormGroup;
  submitted = false;
  error: any;

  constructor(public formBuilder: FormBuilder, private SignSer: SignUpService, public router: Router) { }

  ngOnInit(): void {
    this.TokenForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', Validators.required]
    });
  }
  get f() { return this.TokenForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.TokenForm.valid) {
      this.SignSer.ValidateOTP(this.TokenForm.value.email,this.TokenForm.value.token).subscribe(data => {
        alert(data.Error);
        if (data.Success)
          this.backToLogin();
        else
          this.TokenForm.reset();
      });
    }
  }
  Clear() {
    this.submitted = false;
    this.TokenForm.reset();
  }
  backToLogin() {
    this.router.navigate(['/']);
  } 

}
