import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  loginform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  })

  submitlogin(): void {
    if (this.loginform.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        confirmButtonColor: '#3085d6'
      })
      return;
    }

    this.authService.loginform(this.loginform.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem("userToken", res.token)
        this.authService.savedUserdata()

        Swal.fire({
          icon: 'success',
          title: 'Welcome back!',
          text: 'Login successful.',
          confirmButtonColor: '#28a745',
          timer: 2000,
          showConfirmButton: false
        })

        this.router.navigate(["/home"])
      },
      error: (err) => {
        console.log(err);

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error.message || 'Invalid email or password.',
          confirmButtonColor: '#d33'
        })
      }
    })
  }
}
