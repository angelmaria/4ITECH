import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './authentication/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
  // configuración de HttpClient con interceptor JWT:
  // Ya no hace falta import de HttpClientModule en los components
  provideHttpClient(withInterceptors([jwtInterceptor]))
  
  ]


};
