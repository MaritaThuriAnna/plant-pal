import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllPlants } from '../../store/plants/plant.selectors';
import { loadPlants, updateLastWatered } from '../../store/plants/plant.actions';

@Component({
  standalone: true,
  selector: 'app-plant-list',
  imports: [CommonModule],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.css'
})
export class PlantListComponent {
  plants$ 

  constructor(private store: Store) {
    this.plants$ = this.store.select(selectAllPlants);
    this.store.dispatch(loadPlants());
  }

  markAsWatered(plantId: string) {
    console.log("plant id: ", plantId);
    const today = new Date().toISOString().split('T')[0];
    this.store.dispatch(updateLastWatered({ plantId, date: today }));
  }

  getPlantStatus(plant: any): string {
    const lastWateredDate = new Date(plant.lastWatered);
    const today = new Date();
    const diffTime = today.getTime() - lastWateredDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= plant.wateringFrequency ? 'Needs watering' : 'OK';
  }
  
  
}
