import { Component } from '@angular/core';
import { HomeOrganiComponent } from "../home-organi/home-organi.component";
import { HomePartiComponent } from "../home-parti/home-parti.component";
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../interfaces/users';
import { CommonModule } from '@angular/common';
import { HomeService } from '../home.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Eventos } from '../../interfaces/Eventos';
import { Inscripcion } from '../../interfaces/Inscripcion';
import { Categorias } from '../../interfaces/Categorias';
import { TranslateModule } from '@ngx-translate/core';
import { Ubicaciones } from '../../interfaces/ubicaciones';

@Component({
  selector: 'app-home-admin',
  imports: [CommonModule, TranslateModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {


  
  Eventos : Eventos[] = [];
  Users : IUser[] = [];
  Inscripciones : Inscripcion[] = [];
  Categorias : Categorias[] = [];
  Ubicaciones : Ubicaciones[] = [];

 

  constructor(private auth : AuthService, private homes : HomeService, private router : Router) { }

  ngOnInit() {

  this.geteventos();
  this.getusers();
  this.getinscripciones();
  this.getcategorias();
  this.getubicaciones();


  }


  get logUser() : IUser | undefined {

    return this.auth.auth;
  }

  //Recuperar todos los datos y pintarlos en las tablas


  geteventos() {
    return this.homes.getEventos().subscribe(
      (response) => {
        console.log('Bilera lortu da:', response);
        this.Eventos = response;
      },
      (error) => {
        console.error('Errorea bilera lortzean:', error);
      }
    );
  }

  getusers() {
    return this.homes.getUsers().subscribe(
      (response) => {
        console.log('Bilera lortu da:', response);
        this.Users = response;
      },
      (error) => {
        console.error('Errorea bilera lortzean:', error);
      }
    );
  }

  getinscripciones() {
    return this.homes.getInscripciones().subscribe(
      (response) => {
        console.log('Bilera lortu da:', response);
        this.Inscripciones = response;
      },
      (error) => {
        console.error('Errorea bilera lortzean:', error);
      }
    );
  }

  getcategorias() {
    return this.homes.getCategorias().subscribe(
      (response) => {
        console.log('Bilera lortu da:', response);
        this.Categorias = response;
      },
      (error) => {
        console.error('Errorea bilera lortzean:', error);
      }
    );
  }

  getubicaciones() {
    return this.homes.getUbicaciones().subscribe(
      (response) => {
        console.log('Ubicaciones recibidas:', response); // Verifica que tienes 13 elementos aquí
        console.log('Longitud de ubicaciones:', response.length); // Verifica la longitud
        this.Ubicaciones = response;
      },
      (error) => {
        console.error('Error al recuperar ubicaciones:', error);
      }
    );
  }
  

  showUbicacion( ubicacion : Ubicaciones ) { // Con routerOutlet EN EL TS

    this.router.navigate(['ubiDetails', ubicacion.id]);

    console.log('Ubicación seleccionada:', ubicacion);
    
    // Ir a la página de ubicaciones donde se mostrara la ubicación con su MAPA
  }

  addUser() {

    this.router.navigate(['userDetails']);

  }


  get evetos() : Eventos[] {
    return this.Eventos;
  }

  get users() : IUser[] {
    return this.Users;
  }

  get inscripciones() : Inscripcion[] {
    return this.Inscripciones;
  }

  get categorias() : Categorias[] {
    return this.Categorias;
  }

  get ubicaciones() : Ubicaciones[] {
    return this.Ubicaciones;
  }



  deleteUser(_t11: IUser) {

    this.homes.deleteUser(_t11.id).subscribe
    (
      (response) => {
        console.log('Usuario eliminado:', response);
        this.getusers();
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }
  editUser(_t11: IUser) {
    this.router.navigate(['userDetails', _t11.id]);
  }
  



  addUbi() {
    this.router.navigate(['ubiForm']);
    
  }
  verUbi(_t11: Ubicaciones) {

    this.router.navigate(['ubiDetails', _t11.id]);
  } 
  editUbi(_t11: Ubicaciones) {
    this.router.navigate(['ubiEdit', _t11.id]);
  }
  deleteUbi(_t11: Ubicaciones) {
    console.log('Ubicación a eliminar:', _t11);
    this.homes.deleteUbicacion(+_t11.id)
    .subscribe
    (
      (response) => {
        console.log('Ubicación eliminada:', response);
        this.getubicaciones();
      },
      (error) => {
        console.error('Error al eliminar la ubicación:', error);
      }
    );
  }


  
  
 




}
