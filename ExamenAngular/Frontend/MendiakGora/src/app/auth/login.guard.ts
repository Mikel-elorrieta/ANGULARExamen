import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const mezua = 'Login egin behar duzu';

  if (authService.logeatutaDago()) {
  return true;
  } else {

    snackBar.open(mezua, 'itxi', { duration: 5000 });

  router.navigate(['./auth/login']);
  return false;
  }

};
