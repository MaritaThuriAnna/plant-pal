import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStore } from '@ngrx/store';
import { environment } from './environments/environment';
import { provideEffects } from '@ngrx/effects';
import { PlantEffects } from './app/store/plants/plant.effects';
import { plantReducer } from './app/store/plants/plant.reducer';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { routes } from './app/app.routes';


const firebaseApp = initializeApp(environment.firebase);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideMessaging(() => getMessaging()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStore({ plants: plantReducer }),
    provideDatabase(() => getDatabase()),
    provideEffects([PlantEffects]),

  ],
});