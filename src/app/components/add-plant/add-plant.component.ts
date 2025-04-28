import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addPlant } from '../../store/plants/plant.actions';

@Component({
  standalone: true,
  selector: 'app-add-plant',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-plant.component.html',
  styleUrl: './add-plant.component.css'
})
export class AddPlantComponent {
  form: FormGroup;  

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
      const plant = {
        id: '',
        name: this.form.value.name!,
        species: this.form.value.species || '',
        wateringFrequency: this.form.value.wateringFrequency ?? 0,
        notes: this.form.value.notes || ''
      };

      this.store.dispatch(addPlant({ plant }));
      this.form.reset();
    }
  }
}
