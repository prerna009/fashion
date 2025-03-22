import { Component } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.regForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      confirmPassword: ['', Validators.required]
    }, <AbstractControlOptions> { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.regForm.invalid) return;
    const formData = { ...this.regForm.value }; 
    delete formData.confirmPassword;
    this.authService.register(formData).subscribe({
      next: (res) => {
        this.toaster.success('User registered successfully');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toaster.error(err);
      },
    });
  }
}
