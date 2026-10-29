import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ButtonDirective],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
