import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink ,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() IsLogin: boolean = true;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logoutsubmit(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken");
        this.authService.userData = null;
        Swal.fire({
          icon: 'success',
          title: 'Logged out',
          text: 'You have been logged out successfully.',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(["/login"]);
      }
    });
  }
}
