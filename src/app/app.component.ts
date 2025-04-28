import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadPlants } from './store/plants/plant.actions';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'plant-pal';

  constructor(private store: Store) {
    this.store.dispatch(loadPlants());
  }  
}
