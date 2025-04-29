import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPlants } from './store/plants/plant.actions';
import { AddPlantComponent } from "./components/add-plant/add-plant.component";
import { PlantListComponent } from "./components/plant-list/plant-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { WateringScheduleComponent } from "./components/watering-schedule/watering-schedule.component";

@Component({
  selector: 'app-root',
  imports: [AddPlantComponent, PlantListComponent, DashboardComponent, WateringScheduleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'plant-pal';

  constructor(private store: Store) {
    this.store.dispatch(loadPlants());
  }  

}
