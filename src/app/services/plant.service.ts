import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
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
        const { id, ...plantWithoutId } = plant;
        return from(addDoc(plantRef, plantWithoutId)).pipe(
            map(docRef => ({
                ...plant,
                id: docRef.id // noul id corect
            }))
        );
    }

    updateLastWatered(plantId: string, date: string) {
        const plantDocRef = doc(db, 'plants', plantId);
        return from(updateDoc(plantDocRef, { lastWatered: date }));
    }

    updatePlant(plant: Plant) {
        const plantDocRef = doc(db, 'plants', plant.id);
        return from(updateDoc(plantDocRef, {
          name: plant.name,
          species: plant.species,
          wateringFrequency: plant.wateringFrequency,
          notes: plant.notes
        }));
      }
      
}
