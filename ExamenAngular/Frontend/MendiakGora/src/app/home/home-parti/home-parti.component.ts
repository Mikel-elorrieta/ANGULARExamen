import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ubicaciones } from '../../interfaces/ubicaciones';
import { HomeService } from '../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-parti',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './home-parti.component.html',
  styleUrl: './home-parti.component.css',
})
export class HomePartiComponent {
  ubicacion: Ubicaciones = {
    id: '',
    nombre: { es: '', eu: '' },
    direccion: { es: '', eu: '' },
    lat: 0,
    lng: 0,
  };

  constructor(
    private service: HomeService,
    private route: ActivatedRoute,
    private auths: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    console.log('Ubicación:', this.ubicacion.id);

    if (this.ubicacion.id === '') {
      this.guardar(this.ubicacion);
    } else {
      this.editar(this.ubicacion);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log('ID:', id);
      if (id) {
        this.service.getUbicacionById(id).subscribe((response) => {
          console.log('Ubicación:', response);
          this.ubicacion = response;
        });
      }
    });
  }

  guardar(ubicacion: Ubicaciones) {
    if (!window.confirm('¿Crear ubicación?')) {
      return;
    }
    this.service.crearUbicacion(ubicacion).subscribe(
      () => {
        alert('Ubicación creada correctamente');
      },
      (error) => {
        console.error('Error al crear ubicación:', error);
        alert('Hubo un error al crear la ubicación');
      }
    );
  }

  editar(ubicacion: Ubicaciones) {
    if (!window.confirm('¿Editar ubicación?')) {
      return;
    }
    console.log('Ubicación a editar:', ubicacion);
    this.service.editarUbicacion(ubicacion).subscribe(
      () => {
        alert('Ubicación editada correctamente');
        this.router.navigate(['home/ubicaciones']);
      },
      (error) => {
        console.error('Error al editar ubicación:', error);
        alert('Hubo un error al editar la ubicación');
      }
    );
  }
}
