import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; //

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headarsInterceptor } from '../interceptors/headars/headars.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from '../interceptors/loading/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()) , provideHttpClient(withFetch() , withInterceptors([headarsInterceptor , loadingInterceptor]) )  ,   provideAnimations() , importProvidersFrom(     NgxSpinnerModule
 ) ]
};
