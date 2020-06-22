import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, RouteComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SearchDetComponent } from './components/search-det/search-det.component';
import { SearchComponent } from './components/search/search.component';
import { EditSearchComponent } from './components/edit-search/edit-search.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import 'hammerjs'
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ResetTokenComponent } from './components/reset-token/reset-token.component';
import { CommonModule } from '@angular/common';
import { LoginBComponent } from './components/login-b/login-b.component';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { ValidateregisrationComponent } from './components/validateregistration/validateregisration.component';

const MaterialModule = [MatCardModule, MatInputModule,
  MatButtonModule, MatButtonToggleModule, MatIconModule, MatBadgeModule, MatProgressSpinnerModule,
  MatFormFieldModule];

@NgModule({
  declarations: [
    AppComponent,
    RouteComponents,
    SearchDetComponent,
    SearchComponent,
    EditSearchComponent,
    DialogComponent,
    SignupComponent,
    ForgotpassComponent,
    ResetTokenComponent,
    LoginBComponent,
    ValidateregisrationComponent,
  ],
  entryComponents: [DialogComponent],
  imports: [
    MatPaginatorModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatExpansionModule,
    MatCheckboxModule,
    ModalModule.forRoot(),
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,  
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
