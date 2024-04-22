import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';

export const userRoleGuard: CanActivateFn = (route, state) => {
  // Guard funcional que sirva para comprobar si el usuario tiene el rol de ADMIN
// Sirve para proteger las rutas, se añade para proteger la ruta que queramos proteger  en app.routes.ts
// Si es ADMIN puede pasar (return true)
// Si no es ADMIN entonces router.navigate a /login

  const authService = inject(AuthenticationService);
  const router = inject(Router);
  
  if (authService.getIsAdmin()) {
    return true;
  } else {
    return router.navigate(['/login']);
  }

};
