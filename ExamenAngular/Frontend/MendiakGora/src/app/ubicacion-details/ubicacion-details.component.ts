import { Component } from '@angular/core';
import { Ubicaciones } from '../interfaces/ubicaciones';
import { MapaComponent } from '../mapa/mapa.component';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ubicacion-details',
  imports: [MapaComponent, CommonModule],
  templateUrl: './ubicacion-details.component.html',
  styleUrl: './ubicacion-details.component.css'
})
export class UbicacionDetailsComponent {

  constructor(private activateRoute : ActivatedRoute, private homes: HomeService) { }

  _ubicacion?: Ubicaciones ;


  

  //Suscribirse al id de la url para obtener la ubicacion


  id: number = 0;


  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.getUbicacionById();
    });
  }



  getUbicacionById() {
    this.homes.getUbicacionById(this.id).subscribe(
      (response) => {
        this._ubicacion = response;
        console.log(this.ubicacion);
      },
      (error) => {
        console.error('Error al obtener la ubicacion', error);
      }
    );
    
  }

  get ubicacion () {

    return this._ubicacion;
  }


 

}
