import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../services/notification.service';
import { selectAllPlants } from '../../store/plants/plant.selectors';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [NgFor, AsyncPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  private store = inject(Store);
  private notify = inject(NotificationService);
  notifications$ = this.notify.notifications$;
  private notifiedPlants = new Set<string>();

  ngOnInit(): void {
    this.notify.askPermission();

    this.store.select(selectAllPlants).subscribe(plants => {
      const today = new Date();

      for (const plant of plants) {
        const lastWatered = new Date(plant.lastWatered);
        const diffDays = Math.floor(
          (today.getTime() - lastWatered.getTime()) / (1000 * 60 * 60 * 24)
        );

        
        if (diffDays >= plant.wateringFrequency && !this.notifiedPlants.has(plant.id)) {
          this.notify.showNotification(`💧 ${plant.name} needs watering today!`);
          this.notifiedPlants.add(plant.id);
        }
      }
    });
  }
}
