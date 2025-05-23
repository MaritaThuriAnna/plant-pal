import { createReducer, on } from '@ngrx/store';
import * as PlantActions from './plant.actions';
import { Plant } from './plant.model';

export interface PlantState {
  plants: Plant[];
  loading: boolean;
  error: any;
}

export const initialState: PlantState = {
  plants: [],
  loading: false,
  error: null,
};

export const plantReducer = createReducer(
  initialState,
  on(PlantActions.loadPlants, state => ({ ...state, loading: true })),
  on(PlantActions.loadPlantsSuccess, (state, { plants }) => ({ ...state, plants, loading: false })),
  on(PlantActions.loadPlantsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(PlantActions.addPlant, state => ({ ...state, loading: true })),
  on(PlantActions.addPlantSuccess, (state, { plant }) => ({
    ...state,
    plants: [...state.plants, plant],
    loading: false
  })),
  on(PlantActions.addPlantFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(PlantActions.updateLastWateredSuccess, (state, { plantId, date }) => ({
    ...state,
    plants: state.plants.map(plant =>
      plant.id === plantId ? { ...plant, lastWatered: date } : plant
    )
  })),

  on(PlantActions.updatePlantSuccess, (state, { plant }) => ({
    ...state,
    plants: state.plants.map(p =>
      p.id === plant.id ? { ...p, ...plant } : p
    )
  })),
  
  on(PlantActions.deletePlantSuccess, (state, { plantId }) => ({
    ...state,
    plants: state.plants.filter(plant => plant.id !== plantId)
  }))
  
);
