import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { TokenInterceptor } from './token.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(), // must be first
    provideRouter(routes),
    provideHttpClient(withInterceptors([TokenInterceptor]))
  ]
});
