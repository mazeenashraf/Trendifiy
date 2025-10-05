import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../shared/navbar/navbar/navbar.component";
import { FooterComponent } from "../../../shared/footer/footer/footer.component";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
