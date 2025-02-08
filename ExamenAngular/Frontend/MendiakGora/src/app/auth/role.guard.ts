import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.auth;

  // Verificar si el usuario tiene el tipo adecuado para la ruta
  if (user) {
    const requiredRole = route.data['role'];  // El rol requerido se pasa como data en las rutas
    if (user.tipo_id === requiredRole) {
      return true;  // El usuario tiene el rol adecuado
    }
  }

  // Si no tiene el tipo adecuado, redirigir a otra ruta o a login
  router.navigate(['']);  // Redirigir a la página de login si el rol no coincide
  return false;
};
