// src/app/store/plants/plant.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PlantActions from './plant.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PlantService } from '../../services/plant.service';

@Injectable()
export class PlantEffects {
    private actions$ = inject(Actions);

    loadPlants$
    addPlant$
    updateLastWatered$
    updatePlant$
    deletePlant$

    constructor(
        private plantService: PlantService
    ) {
        this.loadPlants$ = createEffect(() =>
            this.actions$.pipe(
                ofType(PlantActions.loadPlants),
                mergeMap(() =>
                    this.plantService.getPlants().pipe(
                        map(plants => PlantActions.loadPlantsSuccess({ plants })),
                        catchError(error => of(PlantActions.loadPlantsFailure({ error })))
                    )
                )
            )
        );

        this.addPlant$ = createEffect(() =>
            this.actions$.pipe(
                ofType(PlantActions.addPlant),
                mergeMap(({ plant }) =>
                    this.plantService.addPlant(plant).pipe(
                        map(savedPlant => PlantActions.addPlantSuccess({ plant: savedPlant })),
                        catchError(error => of(PlantActions.addPlantFailure({ error })))
                    )
                )
            )
        );

        this.updateLastWatered$ = createEffect(() =>
            this.actions$.pipe(
                ofType(PlantActions.updateLastWatered),
                mergeMap(({ plantId, date }) =>
                    this.plantService.updateLastWatered(plantId, date).pipe(
                        map(() => PlantActions.updateLastWateredSuccess({ plantId, date })),
                        catchError(error => of(PlantActions.updateLastWateredFailure({ error })))
                    )
                )
            )
        );

        this.updatePlant$ = createEffect(() =>
            this.actions$.pipe(
              ofType(PlantActions.updatePlant),
              mergeMap(({ plant }) =>
                this.plantService.updatePlant(plant).pipe(
                  map(() => PlantActions.updatePlantSuccess({ plant })),
                  catchError(error => of(PlantActions.updatePlantFailure({ error })))
                )
              )
            )
          );

        this.deletePlant$ = createEffect(() =>
            this.actions$.pipe(
              ofType(PlantActions.deletePlant),
              mergeMap(({ plantId }) =>
                this.plantService.deletePlant(plantId).pipe(
                  map(() => PlantActions.deletePlantSuccess({ plantId })),
                  catchError(error => of(PlantActions.deletePlantFailure({ error })))
                )
              )
            )
          );
    }


}
