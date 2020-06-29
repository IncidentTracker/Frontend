import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ErrorStateMatcher } from '@angular/material/core';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CustomValidators } from 'src/app/services/custom-validators';


/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-edit-search',
  templateUrl: './edit-search.component.html',
  styleUrls: ['./edit-search.component.css']
})

export class EditSearchComponent implements OnInit {
  // matcher = new MyErrorStateMatcher();
  AddPage: boolean = true;
  EditForm: FormGroup;
  message: string;
  Flag: string;
  modalRef: BsModalRef;
  btnName: string;
  public breakpoint: number;
  startDate = new Date(1990, 0, 1);
  supervisor: string;
  EditSearchData: any
  IR: any;
  LastModifiedDate = new Date();
  public DialogResult = "";


  ngOnInit(): void {

    if (localStorage.currentUser == undefined) {
      this.router.navigate(['/']);
    }
  }

  constructor(public dialog: MatDialog, public formBuilder: FormBuilder, private modalService: BsModalService, private SearchSer: SearchService, public router: Router) {


    this.supervisor = localStorage.currentUserEmail;

    //Inside constructor
    this.createForm();

    var CurrentURL;
    CurrentURL = this.router.url;

    if (this.SearchSer.EditSearchData && CurrentURL === "/update") {
      this.AddPage = false;
      this.EditSearchData = this.SearchSer.EditSearchData;
      this.EditForm.patchValue({
        IA: (this.EditSearchData.IA) ? this.EditSearchData.IA : "",
        IR: (this.EditSearchData.IR) ? this.EditSearchData.IR : "",
        Date: (this.EditSearchData.Date) ? this.EditSearchData.Date : "",
        Severity: (this.EditSearchData.Severity) ? this.EditSearchData.Severity : "",
        FunctionalArea: (this.EditSearchData.FunctionalArea) ? this.EditSearchData.FunctionalArea : "",
        ReportedBy: (this.EditSearchData.ReportedBy) ? this.EditSearchData.ReportedBy : "",
        ProblemReported: (this.EditSearchData.ProblemReported) ? this.EditSearchData.ProblemReported : "",
        RootCause: (this.EditSearchData.RootCause) ? this.EditSearchData.RootCause : "",
        ActionResolutionWorkaround: (this.EditSearchData.ActionResolutionWorkaround) ? this.EditSearchData.ActionResolutionWorkaround : "",
        LongTermSolutionNeeded: (this.EditSearchData.LongTermSolutionNeeded) ? this.EditSearchData.LongTermSolutionNeeded : "",
        RedirectedtoOtherTeams: (this.EditSearchData.RedirectedtoOtherTeams) ? this.EditSearchData.RedirectedtoOtherTeams : "",
        Timetakentoresolvetheproblem: (this.EditSearchData.Timetakentoresolvetheproblem) ? this.EditSearchData.Timetakentoresolvetheproblem : "",
        Team: (this.EditSearchData.Team) ? this.EditSearchData.Team : ""
      })
    }
  }

  createForm() {
    this.EditForm = this.formBuilder.group({
      LastModifiedBy: new FormControl(),
      Date: new FormControl(null, [Validators.required, CustomValidators.dateValidator(/^[0-9]{2}-[0-9]{2}-[0-9]{2}$/, { hasFormat: true })]),
      IA: new FormControl(null, [Validators.required]),
      IR: new FormControl(null, [Validators.required]),
      Severity: new FormControl(null, [Validators.required]),
      FunctionalArea: new FormControl(null, [Validators.required]),
      ReportedBy: new FormControl(null, [Validators.required]),
      ProblemReported: new FormControl(null, [Validators.required]),
      RootCause: new FormControl(null, [Validators.required]),
      ActionResolutionWorkaround: new FormControl(null, [Validators.required]),
      LongTermSolutionNeeded: new FormControl(null, [Validators.required]),
      RedirectedtoOtherTeams: new FormControl(null, [Validators.required]),
      Timetakentoresolvetheproblem: new FormControl(null, [Validators.required]),
      Team: new FormControl(null, [Validators.required]),
      LastModifiedDate: new FormControl(),
    });
    this.EditForm.patchValue({ LastModifiedBy: localStorage.currentUserEmail });
    this.EditForm.patchValue({ LastModifiedDate: this.LastModifiedDate});
  }

  onSubmit() {

  }

  openDialog(action) {

    if (action === 'Add') {
      if (!this.EditForm.valid) {
        alert("Fill in the mandatory fields");
        this.Flag = 'X'; 
      }
      else {
        this.message = "Are you sure want to Add ?";
        this.Flag = 'A';
      }
    }
    else {
      if (action === 'Update') {
        this.message = "Are you sure want to update ?";
        this.Flag = 'U';
      }
      else if (action === 'Delete') {
        this.message = "Are you sure want to delete ?";
        this.Flag = 'D';
      }
      else if (action === 'Reset') {
        this.message = "Are you sure want to reset ?";
        this.Flag = 'R';
      }
      else if (action === 'Cancel') {
        this.message = "Are you sure want to cancel ?";
        this.Flag = 'C';
      }
    }

    if (this.Flag != 'X') {
      let dialogref = this.dialog.open(DialogComponent, { data: { text: this.message } });

      dialogref.afterClosed().subscribe(results => {
        this.DialogResult = "";

        if (results === 'true') {
          this.DialogResult = "confirm";
        }

        if (this.DialogResult == 'confirm') {
          if (this.Flag === 'A') {
            this.Add();
          }
          if (this.Flag === 'U') {
            this.Update();
          }
          if (this.Flag === 'D') {
            this.Delete();
          }
          if (this.Flag === 'R') {
            this.Reset();
          }
          if (this.Flag === 'C') {
            this.BacktoSearchResult();
          }
        }
      })
    }
  }

  Add() {
    var NewData = [];
    NewData.push(this.EditForm.value);
    this.SearchSer.AddData(NewData[0])
      .subscribe(data => {
        alert(data.Error);
        this.BacktoSearchResult();
      });
  }


  // Update or Edit existing details
  Update() {
    var EditData = [];
    EditData.push(this.EditForm.value);

    this.SearchSer.updateData(this.EditSearchData._id, EditData[0])
      .subscribe(data => {
        alert(data.Error);
        this.BacktoSearchResult()
      });    
  }


  Delete() {
    this.SearchSer.deleteData(this.EditSearchData._id)
      .subscribe(data => {
        alert(data.Error);
        this.BacktoSearchResult()
      });
  }

  Reset() {
    this.EditForm.reset();
  }

  BacktoSearchResult() {
    this.router.navigate(['/list']);
  }

}