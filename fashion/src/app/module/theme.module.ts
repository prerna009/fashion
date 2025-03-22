import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../component/register/register.component';
import { LoginComponent } from '../component/login/login.component';
import { HomeComponent } from '../component/home/home.component';
import { NavbarComponent } from '../component/navbar/navbar.component';
import { FooterComponent } from '../component/footer/footer.component';
import { MaterialModule } from './material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ThemeModule { }
