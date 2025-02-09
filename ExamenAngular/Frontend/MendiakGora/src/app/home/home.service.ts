import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Eventos } from '../interfaces/Eventos';
import { IUser } from '../interfaces/users';
import { Inscripcion } from '../interfaces/Inscripcion';
import { Categorias } from '../interfaces/Categorias';
import { Ubicaciones } from '../interfaces/ubicaciones';

/**
 * Servicio para gestionar las operaciones relacionadas con la página de inicio.
 */
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private router: Router) { }

  // Métodos relacionados con Eventos
  /**
   * Obtiene la lista de eventos desde el backend.
   * @returns Un Observable de un array de Eventos.
   */
  getEventos() {
    return this.http.get<Eventos[]>(`${environment.baseUrl}/eventos`);
  }

  // Métodos relacionados con Usuarios
  /**
   * Obtiene la lista de usuarios desde el backend.
   * @returns Un Observable de un array de IUser.
   */
  getUsers() {
    return this.http.get<IUser[]>(`${environment.baseUrl}/users`);
  }

  /**
   * Elimina un usuario por ID.
   * @param id El ID del usuario a eliminar.
   * @returns Un Observable del IUser eliminado.
   */
  deleteUser(id: number | undefined) {
    return this.http.delete<IUser>(`${environment.baseUrl}/usersDelete/${id}`);
  }

  /**
   * Obtiene un usuario por ID.
   * @param id El ID del usuario a obtener.
   * @returns Un Observable del IUser.
   */
  getUsuarioById(id: number) {
    return this.http.get<IUser>(`${environment.baseUrl}/users/${id}`);
  }

  /**
   * Crea un nuevo usuario.
   * @param user Los datos del usuario a crear.
   * @returns Un Observable del IUser creado.
   */
  crearUsuario(user: IUser) {
    return this.http.post<IUser>(`${environment.baseUrl}/insertUser`, user);
  }

  /**
   * Actualiza un usuario existente.
   * @param user Los datos del usuario a actualizar.
   * @returns Un Observable del IUser actualizado.
   */
  editarUsuario(user: IUser) {
    return this.http.post<IUser>(`${environment.baseUrl}/updateUser`, user);
  }

  // Métodos relacionados con Inscripciones
  /**
   * Obtiene la lista de inscripciones desde el backend.
   * @returns Un Observable de un array de Inscripcion.
   */
  getInscripciones() {
    return this.http.get<Inscripcion[]>(`${environment.baseUrl}/inscripciones`);
  }

  // Métodos relacionados con Categorías
  /**
   * Obtiene la lista de categorías desde el backend.
   * @returns Un Observable de un array de Categorias.
   */
  getCategorias() {
    return this.http.get<Categorias[]>(`${environment.baseUrl}/categorias`);
  }

  // Métodos relacionados con Ubicaciones
  /**
   * Obtiene la lista de ubicaciones desde el backend.
   * @returns Un Observable de un array de Ubicaciones.
   */
  getUbicaciones() {
    return this.http.get<Ubicaciones[]>(`${environment.URL}/ubicaciones`);
  }

  /**
   * Muestra la lista de ubicaciones desde el backend.
   * @returns Un Observable de un array de Ubicaciones.
   */
  showUbicacion() {
    return this.http.get<Ubicaciones[]>(`${environment.URL}/ubicaciones`);
  }

  /**
   * Obtiene una ubicación por ID.
   * @param id El ID de la ubicación a obtener.
   * @returns Un Observable de la Ubicaciones.
   */
  getUbicacionById(id: number) {
    return this.http.get<Ubicaciones>(`${environment.URL}/ubicaciones/${id}`);
  }

  // CRUD Ubicaciones

deleteUbicacion(id: number | undefined) {
  return this.http.delete<Ubicaciones>(`${environment.URL}/ubicaciones/${id}`);
}


  editarUbicacion(ubicacion: Ubicaciones) {
    return this.http.put<Ubicaciones>(`${environment.URL}/ubicaciones/${ubicacion.id}`, ubicacion);
  }

 
  crearUbicacion(ubicacion: Ubicaciones) {
    return this.http.post<Ubicaciones>(`${environment.URL}/ubicaciones`, ubicacion);
  }

}

