import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const userExists = await this.authService.validateUser(email, password);
        if (userExists) {

          console.log('Usuario autenticado');
          this.router.navigate(['/products/products-grid']);
          this.authService.setAuthStatus(true);
        } else {
          this.authService.setAuthStatus(false);
          console.error('Usuario no encontrado o contraseña incorrecta');
        }
      } catch (err) {
        console.error('Error durante la autenticación: ', err);
      }
    } else {
      console.error('El formulario no es válido');
    }
  }
}
