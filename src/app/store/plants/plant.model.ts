export interface Plant {
  id: string;
  name: string;
  species?: string;
  photoUrl?: string;
  wateringFrequency: number; // in zile
  lastWatered: string;
  nextWatering: string;
  notes?: string;
}
