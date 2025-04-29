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
    }


}
