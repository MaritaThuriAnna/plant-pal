import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllPlants } from '../../store/plants/plant.selectors';
import { loadPlants, updateLastWatered, updatePlant } from '../../store/plants/plant.actions';
import { NotificationComponent } from "../notification/notification.component";
import { NotificationService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-plant-list',
  imports: [CommonModule, NotificationComponent, FormsModule],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.css'
})
export class PlantListComponent {
  plants$

  constructor(private store: Store, private notify: NotificationService) {
    this.plants$ = this.store.select(selectAllPlants);
    this.store.dispatch(loadPlants());
  }

  markAsWatered(plantId: string) {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    this.store.select(selectAllPlants).subscribe(plants => {
      const plant = plants.find(p => p.id === plantId);
      if (plant) {
        const nextWateringDate = new Date(today.getTime() + plant.wateringFrequency * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];

        this.store.dispatch(updateLastWatered({ plantId, date: todayString, nextWatering: nextWateringDate }));

        this.notify.clearNotificationForPlant(plantId);
      }
    }).unsubscribe();
  }


  getPlantStatus(plant: any): string {
    const lastWateredDate = new Date(plant.lastWatered);
    const today = new Date();
    const diffTime = today.getTime() - lastWateredDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays >= plant.wateringFrequency ? 'Needs watering' : 'OK';
  }

  editingPlant: any = null;
  editForm: any = {
    name: '',
    species: '',
    wateringFrequency: 0,
    notes: ''
  };

  editPlant(plant: any) {
    this.editingPlant = plant;
    this.editForm = {
      name: plant.name,
      species: plant.species || '',
      wateringFrequency: plant.wateringFrequency,
      notes: plant.notes || ''
    };
  }

  savePlant() {
    const updatedPlant = {
      ...this.editingPlant,
      ...this.editForm
    };

    this.store.dispatch(updatePlant({ plant: updatedPlant }));

    this.editingPlant = null;
  }

  cancelEdit() {
    this.editingPlant = null;
  }
}
