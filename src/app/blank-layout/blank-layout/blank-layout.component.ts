import { Component, Input, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../shared/navbar/navbar/navbar.component";
import { FooterComponent } from "../../../shared/footer/footer/footer.component";

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

}
