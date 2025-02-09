import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { UbicacionDetailsComponent } from './ubicacion-details/ubicacion-details.component';
import { HomeOrganiComponent } from './home/home-organi/home-organi.component';
import { HomePartiComponent } from './home/home-parti/home-parti.component';

export const routes: Routes = [

    {
        path: '', component: LoginComponent,
      },
      {path: 'home/administrador' , component: HomeComponent},
      {path: 'home/organizador' , component: HomeComponent},
      {path: 'home/participante' , component: HomeComponent},
      {path: 'ubiDetails/:id' , component: UbicacionDetailsComponent},
      {path: 'userDetails' , component: HomeOrganiComponent},
      {path: 'userDetails/:id' , component: HomeOrganiComponent},
      {path: 'ubiForm' , component: HomePartiComponent},
      {path: 'ubiEdit/:id' , component: HomePartiComponent},

      //Rediccionar a la página de inicio si no se encuentra la ruta 
      {path: '**', redirectTo: 'home/administrador'}

];
