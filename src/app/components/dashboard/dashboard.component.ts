import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPlants } from '../../store/plants/plant.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private store = inject(Store);

  totalPlants = 0;
  plantsNeedingWater = 0;
  plantsOk = 0;

  constructor() {
    this.store.select(selectAllPlants).subscribe(plants => {
      this.totalPlants = plants.length;
      const today = new Date();

      let needWater = 0;

      plants.forEach(plant => {
        const lastWatered = new Date(plant.lastWatered);
        const diffDays = Math.floor((today.getTime() - lastWatered.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays >= plant.wateringFrequency) {
          needWater++;
        }
      });

      this.plantsNeedingWater = needWater;
      this.plantsOk = this.totalPlants - this.plantsNeedingWater;
    });
  }
}
