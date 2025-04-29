import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlantState } from './plant.reducer';

export const selectPlantState = createFeatureSelector<PlantState>('plants');

export const selectAllPlants = createSelector(
  selectPlantState,
  (state) => state.plants
);

export const selectLoading = createSelector(
  selectPlantState,
  (state) => state.loading
);
