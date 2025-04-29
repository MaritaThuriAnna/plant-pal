import { Routes } from '@angular/router';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { WateringScheduleComponent } from './components/watering-schedule/watering-schedule.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calendar', component: WateringScheduleComponent },
  { path: 'add-plant', component: AddPlantComponent },
  { path: 'plant-list', component: PlantListComponent },
  { path: '**', redirectTo: 'dashboard' }
];
