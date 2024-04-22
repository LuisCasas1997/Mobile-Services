import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from "./main/bss/core/core.module";
import { NavbarComponent } from "./main/bss/core/navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CoreModule]
})
export class AppComponent {
  title = 'mobile-services';
}
