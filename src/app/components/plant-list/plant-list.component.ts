import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllPlants } from '../../store/plants/plant.selectors';
import { loadPlants } from '../../store/plants/plant.actions';

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
}
