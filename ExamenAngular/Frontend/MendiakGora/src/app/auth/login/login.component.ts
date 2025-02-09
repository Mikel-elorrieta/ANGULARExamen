import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/users';
import { TranslateModule } from '@ngx-translate/core';
import { style } from '@angular/animations';



@Component({
  selector: 'app-login',
  imports: [TranslateModule, MatDialogModule, CommonModule, FormsModule, MatDividerModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatOptionModule, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  Email: string = '';
  Pass: string = '';
  _User!: IUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,

  ) {}

ngOnInit() {
  this.authService.logout();
}

  login() {
    console.log('Email:', this.Email);
    console.log('Pass:', this.Pass);
    if (!this.Email || !this.Pass) {
      this.mostrarSnackbar('Introduce usuario y contraseña');
      return;
    }

    this.authService.login(this.Email, this.Pass).subscribe({
      next: (response) => {
        this._User = response.user;
        console.log(this._User);
        if (this._User) {
          this.authService.guardar(this._User);
          this.mostrarSnackbar('Inicio de sesión exitoso: ' + this._User.nombre);

          this.gohome();
        } else {
          this.Email = '';
          this.Pass = '';
          this.mostrarSnackbar('Credenciales incorrectas');
        }
      },
      error: (error) => {
        console.error('Error en la solicitud de login', error);
        this.mostrarSnackbar('Ocurrió un error al intentar iniciar sesión');
      }
    });
  }

  gohome() {
    switch (this._User.rol_castellano) {
      case "Administrador":
        this.router.navigate(['home/administrador']);
        break;
      case "Organizador":
        this.router.navigate(['home/organizador']);
        break;
      case "Participante":
        this.router.navigate(['home/participante']);
        break;
     

    }
  }

 mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', { duration: 2500 });
  }
}
