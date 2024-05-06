import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{

  constructor(
    private _router: Router,
    private _authService: AuthService
  ){}

  goToAdministrator(){
    this._router.navigate(['/products/administrator-products']);
  }

  goToHome() {
    this._router.navigate(['/products/products-grid']);
  }

  logout() {
    this._authService.setAuthStatus(false);
    this._router.navigate(['/auth/login']);
  }
}
