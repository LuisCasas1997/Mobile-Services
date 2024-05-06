import { Component, NgZone } from '@angular/core';
import { AuthService } from './main/bss/auth/auth.service';
import { BssModule } from './main/bss/bss.module';
import { CommonModule } from '@angular/common';
import { CoreInitialModule } from './main/bss/core/core-initial.module';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    styleUrls: ['./app.component.scss'],
    imports: [
        CommonModule,
        BssModule,
        CoreInitialModule,
        RouterOutlet
    ],
    providers: [
        AuthService
    ],
})
export class AppComponent {

  title = 'mobile-services';
  showNavbar = false;
  superAuth = false;

  constructor(
    private authService: AuthService,
  ) {
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      console.log('isAuthenticated', isAuthenticated);
      this.showNavbar = isAuthenticated;
    });
  }
}
