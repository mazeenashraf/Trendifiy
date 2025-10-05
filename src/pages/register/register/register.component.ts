import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private router = inject(Router)

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    },
    { validators: this.passwordsMatch }
  );

  passwordsMatch(control: AbstractControl) {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
  }

  registersubmit(): void {
    if (this.registerForm.valid) {
      this.authService.regsiterform(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'Your account has been created successfully!',
              confirmButtonColor: '#28a745',
              timer: 2000,
              showConfirmButton: false
            })

            this.router.navigate(["/login"])
          }
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: err.error.message || 'Something went wrong. Please try again.',
            confirmButtonColor: '#d33'
          })
        }
      })
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please make sure all fields are filled and passwords match.',
        confirmButtonColor: '#f0ad4e'
      })
    }
  }
}
