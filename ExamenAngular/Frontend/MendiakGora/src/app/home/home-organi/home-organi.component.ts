import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/users';
import { HomeService } from '../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-organi',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './home-organi.component.html',
  styleUrl: './home-organi.component.css',
})
export class HomeOrganiComponent {
  _ikasleak: IUser[] = [];
  usuario: IUser = {
    id: undefined,
    nombre: '',
    email: '',
    password: '',
    rol_castellano: '',
    rol_euskera: '',
  };
  tipo: number = 0;

  constructor(
    private service: HomeService,
    private route: ActivatedRoute,
    private auths: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    console.log('Usuario:', this.usuario.id);

    console.log(this.tipo) ;
    if(this.tipo == 1){  
      console.log('Administrador');
      this.usuario.rol_castellano = 'Administrador';
      this.usuario.rol_euskera = 'Administratzailea';

    }else if(this.tipo == 2){
      console.log('Organizador');

      this.usuario.rol_castellano = 'Organizador';
      this.usuario.rol_euskera = 'Antolatzailea';

    }
    else if(this.tipo == 3){
      console.log('Participante');
      this.usuario.rol_castellano = 'Participante';
      this.usuario.rol_euskera = 'Parte-hartzailea';
    }
    
    if (this.usuario.id === undefined) {
      this.guardar(this.usuario);
    } else {
      this.editar(this.usuario);
    }
  }
  //REGISTRO DE USUARIO
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log('ID:', id);
      if (id) {
        this.service.getUsuarioById(id).subscribe((response) => {
          console.log('Usuario:', response);
          this.usuario = response;
        });
      }
    });
  }

  guardar(user: IUser) {
    if (!window.confirm('CREATE ?')) {
      return;
    }

    this.service.crearUsuario(user).subscribe(
      (response) => {
        alert('Usuario creado correctamente');
      },
      (error) => {
        console.error('Error al crear usuario:', error);
        alert('Hubo un error al crear el usuario');
      }
    );
  }

  editar(user: IUser) {
    if (!window.confirm('CREATE ?')) {
      return;
    }
    this.service.editarUsuario(user).subscribe(
      (response) => {
        alert('Usuario editado correctamente');
        this.router.navigate(['home/administrador']);
      },
      (error) => {
        console.error('Error al editar usuario:', error);
        alert('Hubo un error al editar el usuario');
      }
    );
  }
}
