import { CanActivateFn } from '@angular/router';

export const userRoleGuard: CanActivateFn = (route, state) => {
  return true;
};
