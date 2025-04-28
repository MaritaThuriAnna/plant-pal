import { Injectable } from '@angular/core';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { from, map } from 'rxjs';
import { Plant } from '../store/plants/plant.model';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';

const firebaseApp = initializeApp(environment.firebase); // mutat aici
const db = getFirestore(firebaseApp);

@Injectable({
    providedIn: 'root',
})
export class PlantService {


    getPlants() {
        const plantRef = collection(db, 'plants');
        return from(getDocs(plantRef)).pipe(
            map(snapshot =>
                snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Plant))
            )
        );
    }

    addPlant(plant: Plant) {
        const plantRef = collection(db, 'plants');
        return from(addDoc(plantRef, plant)).pipe(
            map(docRef => ({ ...plant, id: docRef.id }))
        );
    }
}
