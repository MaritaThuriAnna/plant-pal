import { createAction, props } from '@ngrx/store';
import { Plant } from './plant.model';

export const loadPlants = createAction('[Plant] Load Plants');
export const loadPlantsSuccess = createAction('[Plant] Load Success', props<{ plants: Plant[] }>());
export const loadPlantsFailure = createAction('[Plant] Load Failure', props<{ error: any }>());

export const addPlant = createAction('[Plant] Add Plant', props<{ plant: Plant }>());
export const addPlantSuccess = createAction('[Plant] Add Plant Success', props<{ plant: Plant }>());
export const addPlantFailure = createAction('[Plant] Add Plant Failure', props<{ error: any }>());

export const updateLastWatered = createAction(
    '[Plant] Update LastWatered',
    props<{ plantId: string, date: string, nextWatering: string }>()
  );
  
  export const updateLastWateredSuccess = createAction(
    '[Plant] Update LastWatered Success',
    props<{ plantId: string, date: string }>()
  );
  
  export const updateLastWateredFailure = createAction(
    '[Plant] Update LastWatered Failure',
    props<{ error: any }>()
  );

  export const updatePlant = createAction(
    '[Plant] Update Plant',
    props<{ plant: Plant }>()
  );
  
  export const updatePlantSuccess = createAction(
    '[Plant] Update Plant Success',
    props<{ plant: Plant }>()
  );
  
  export const updatePlantFailure = createAction(
    '[Plant] Update Plant Failure',
    props<{ error: any }>()
  );

  export const deletePlant = createAction(
    '[Plant] Delete Plant',
    props<{ plantId: string }>()
  );
  
  export const deletePlantSuccess = createAction(
    '[Plant] Delete Plant Success',
    props<{ plantId: string }>()
  );
  
  export const deletePlantFailure = createAction(
    '[Plant] Delete Plant Failure',
    props<{ error: any }>()
  );
  
  
  