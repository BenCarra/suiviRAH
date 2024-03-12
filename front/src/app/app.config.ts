import { ApplicationConfig, LOCALE_ID } from '@angular/core';
// LOCALE_ID est importé pour utiliser les dates en français
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // pour les selects
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core'; // pour les formulaires de date

// Imports nécessaires pour afficher la date en français dans la liste des tâches
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CustomDateAdapter } from './shared/model/custom-date-adapter';
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideHttpClient(), 
    provideAnimations(), 
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: DateAdapter, useClass: CustomDateAdapter }]
};
