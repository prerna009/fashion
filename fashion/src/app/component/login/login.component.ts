import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toaster: ToastrService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$')]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    const {emailId, password} = this.loginForm.value;
    this.authService.login(emailId, password).subscribe({
      next: (res) => {
        if (res && res.token) {
          this.toaster.success('User Login Successfully');
          this.router.navigate(['/home']); 
        } else {
          this.toaster.error('Invalid Credentials');
        }
      },
      error: () => {
        this.toaster.error('Something went wrong. Please try again.');
      },
    });
  }
}
