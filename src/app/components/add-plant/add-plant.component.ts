import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addPlant } from '../../store/plants/plant.actions';
import { Plant } from '../../store/plants/plant.model';

@Component({
  standalone: true,
  selector: 'app-add-plant',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-plant.component.html',
  styleUrl: './add-plant.component.css'
})
export class AddPlantComponent {
  form: FormGroup;
  selectedPhotoUrl: string = '';

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      species: [''],
      wateringFrequency: [3, Validators.required],
      notes: ['']
    });
  }

  submit() {
    if (this.form.valid) {
      const today = new Date();
      const wateringFrequency = this.form.value.wateringFrequency ?? 0;
      const nextWateringDate = new Date(today.getTime() + wateringFrequency * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

      const plant: Plant = {
        id: '',
        name: this.form.value.name!,
        species: this.form.value.species || '',
        wateringFrequency: wateringFrequency,
        lastWatered: today.toISOString().split('T')[0],
        nextWatering: nextWateringDate,
        notes: this.form.value.notes || '',
        photoUrl: this.selectedPhotoUrl || ''
      };

      this.store.dispatch(addPlant({ plant }));
      this.form.reset();
      this.selectedPhotoUrl = '';
    }
  }


  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedPhotoUrl = e.target.result; // base64 url
      };
      reader.readAsDataURL(file);
    }
  }

}
