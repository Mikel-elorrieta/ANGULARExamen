import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ubicaciones } from '../interfaces/ubicaciones';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapaService {
  constructor(private http: HttpClient) {}

  async getUbicaciones(): Promise<Ubicaciones[]> {
    try {
      return await lastValueFrom(this.http.get<Ubicaciones[]>('http://localhost:3000/ubicaciones'));
    } catch (error) {
      console.error('Error al obtener ikastetxeak:', error);
      return [];
    }
  }

  async finUbicacionesById(id: string): Promise<Ubicaciones | undefined> {
    try {
      const ubis = await this.getUbicaciones();
      return ubis.find((ubicacion) => ubicacion.id === id);
    } catch (error) {
      console.error('Error al buscar el ikastetxe:', error);
      return undefined;
    }
  }
}
